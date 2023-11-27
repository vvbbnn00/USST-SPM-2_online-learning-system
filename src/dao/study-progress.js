import {generateUpdateFields} from "@/utils/db";
import {db} from "@/dao/connection";

export default class StudyProgressDAO {

    /**
     * 获取用户的学习进度
     * @returns any
     *
     * 返回的格式应当是一个数组，数组中包括了所有的教学材料
     */
    static async queryListByUserId({userId}) {
        const sql = `
            SELECT 
                content_id, user_id, status, last_time
            FROM progress 
            WHERE user_id = ?;
        `;
        const params = [userId];

        const [rows] = await db.execute(sql, params);
        return rows;
    }


    /**
     * 获取某一个学习内容的学习进度
     *
     */
    static async queryByContentId({contentId}) {
        const sql = `
            SELECT 
                content_id, user.user_id as user_id, status, last_time,
                username, name, employee_id, avatar
            FROM user 
            LEFT JOIN progress on user.user_id = progress.user_id AND progress.content_id = ?
            WHERE user.role = 'student';
        `;
        const params = [contentId];

        const [rows] = await db.execute(sql, params);
        return rows;
    }


    /**
     * 更新学习进度
     * @param contentId
     * @param userId
     * @param status
     * @returns {Promise<boolean>}
     */
    static async update({contentId, userId, status}) {
        if (!['finished', 'unfinished'].includes(status)) {
            throw new Error('参数错误');
        }
        const params = [];
        const sql = `
            REPLACE INTO progress (content_id, user_id, status) 
            VALUES (?, ?, ?);
        `;

        params.push(contentId, userId, status);

        const [rows] = await db.execute(sql, params);
        return rows.affectedRows > 0;
    }
}
