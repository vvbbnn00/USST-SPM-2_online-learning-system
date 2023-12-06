import {db} from "@/dao/connection";
import {generateUpdateFields} from "@/utils/db";
import {getUserData} from "@/utils/auth";

export default class GradeDAO {
    // 获取所有用户，姓名，学号，平时成绩，测试成绩。
    static async queryGradeList(examList) {
        const userData = await getUserData();

        const userSql = `
            SELECT user_id, name, employee_id
            FROM user
            WHERE role = 'student' ${userData.role === 'student' ? 'AND user_id = ?' : ''}
        `;
        const [users] = await db.query(userSql, [
            userData.role === 'student' ? userData.userId : null,
        ]);

        const grades = [];

        for (let user of users) {
            const {user_id} = user;

            // 查询平时成绩
            const contentSql = `
                SELECT SUM(content.percentage * IF(progress.status = 'finished', 1, 0)) / SUM(content.percentage) * 100 AS attendance_score
                FROM content
                LEFT JOIN progress ON content.content_id = progress.content_id AND progress.user_id = ?
            `;
            const [attendanceResult] = await db.query(contentSql, [user_id]);
            const attendanceScore = attendanceResult[0]?.attendance_score || 0;

            // 查询测试成绩
            const testScores = await Promise.all(examList.map(async (examTitle) => {
                const testSql = `
                    SELECT
                        answer.user_id,
                        question_bank.title,
                        SUM(answer_detail.score) / SUM(question.percentage) * 100 AS test_score
                    FROM
                        answer
                    JOIN
                        answer_detail ON answer.answer_id = answer_detail.answer_id
                    JOIN
                        question_bank ON answer.question_bank_id = question_bank.question_bank_id
                    JOIN
                        question ON question_bank.question_bank_id = question.question_bank_id
                    WHERE
                        answer.user_id = ?
                        AND answer.status = '已批改'
                        AND question_bank.title = ?
                    GROUP BY
                        answer.user_id, question_bank.title;
                `;
                const [testResult] = await db.query(testSql, [user_id, examTitle.replace(/\s\([^)]*\)/, '')]);
                const testScore = parseFloat(testResult[0]?.test_score) || 0; // 转换为浮点数，如果无法转换，则设为 0

                return testScore;
            }));
            const totalTestScore = testScores.reduce((sum, score, index) => {
                const percentageMatch = examList[index].match(/\((\d+(\.\d+)?)%\)/);
                const percentage = percentageMatch ? parseFloat(percentageMatch[1]) / 100 : 0;

                return sum + score * percentage;
            }, 0);

            const totalScore = (parseFloat(attendanceScore) + totalTestScore) / 2;

            const userGrades = testScores.reduce((acc, testScore, index) => {
                const examName = examList[index];
                acc[examName] = testScore; // 将测试分数直接添加为属性
                return acc;
            }, {
                user_id: user.user_id,
                name: user.name,
                employee_id: user.employee_id,
                attendance_score: attendanceScore, // 不保留小数
                total_test_score: totalTestScore, // 不保留小数
                total_score: totalScore,
            });
            grades.push(userGrades);
        }

        return grades;
    }

    static async queryExamList() {
// 获取所有已发布和已结束的测试
        const questionBankSql = `
        SELECT question_bank_id, title, percentage
        FROM question_bank
        WHERE status IN ('已发布', '已结束');
    `;
        const [exams] = await db.query(questionBankSql);

        // 获取所有已发布和已结束测试的占比总和
        const totalPercentageSql = `
        SELECT SUM(percentage) AS total_percentage
        FROM question_bank
        WHERE status IN ('已发布', '已结束');
    `;
        const [totalPercentageResult] = await db.query(totalPercentageSql);
        const totalPercentage = totalPercentageResult[0]?.total_percentage || 0;

        // 构建每个测试的字符串，包含占比在总占比中的百分比
        const examList = exams.map(({question_bank_id, title, percentage}) => {
            const examPercentageInTotal = (percentage / totalPercentage) * 100;
            return `${title} (${examPercentageInTotal.toFixed(2)}%)`;
        });

        return examList;
    }
}
