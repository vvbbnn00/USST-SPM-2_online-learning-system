import {db} from "@/dao/connection";

export default class AnswerDAO {
    /**
     * 通过id查询答题记录
     * @param answer_id
     */
    static async queryAnswerById({answer_id}) {
        const sql = `
            SELECT answer_id, user_id, question_bank_id, status
            FROM answer WHERE answer_id = ?;
        `;
        const [rows] = await db.execute(sql, [answer_id]);
        return rows[0];
    }

    /**
     * 获取答题记录
     * @param {number|null} user_id
     * @param {number|null} question_bank_id
     * @returns any
     */
    static async queryAnswer({user_id = null, question_bank_id = null}) {
        const where = [];
        const params = [];

        if (user_id) {
            where.push('answer.user_id = ?');
            params.push(user_id);
        }
        if (question_bank_id) {
            where.push('question_bank_id = ?');
            params.push(question_bank_id);
        }
        const sql = `
            SELECT answer_id, answer.user_id as user_id, question_bank_id, status, username, name, employee_id, avatar
            FROM answer 
            LEFT JOIN user ON answer.user_id = user.user_id
            ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        `;
        const [rows] = await db.execute(sql, params);
        return rows;
    }

    /**
     * 插入答题记录
     * @param {number} user_id
     * @param {number} question_bank_id
     * @returns any
     */
    static async insertAnswer({user_id, question_bank_id}) {
        const sql = `
            INSERT INTO answer(user_id, question_bank_id) VALUES (?, ?);
        `;
        const [rows] = await db.execute(sql, [user_id, question_bank_id]);
        return rows.insertId;
    }

    /**
     * 更新答题记录
     * @param answer_id
     * @param status
     * @returns {Promise<number>}
     */
    static async updateAnswerStatus({answer_id, status}) {
        const sql = `
            UPDATE answer SET status = ? WHERE answer_id = ?;
        `;
        const [rows] = await db.execute(sql, [status, answer_id]);
        return rows.affectedRows;
    }
}
