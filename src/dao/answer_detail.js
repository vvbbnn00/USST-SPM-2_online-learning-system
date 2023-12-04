import {db} from "@/dao/connection";

export default class AnswerDetailDAO {
    /**
     * 更新答题记录
     */
    static async updateAnswerDetail({answer_id, question_id, answer, score, status = "unchecked"}) {
        const sql = `
            REPLACE INTO answer_detail(answer, score, answer_id, question_id, status) VALUES (?, ?, ?, ?, ?);
        `;
        const [rows] = await db.execute(sql, [answer, score, answer_id, question_id, status]);
        return rows;
    }

    /**
     * 查询答题记录
     * @param answer_id
     * @returns {Promise<*>}
     */
    static async queryAnswerDetailList({answer_id}) {
        const sql = `
            SELECT answer_id, question_id, answer, score, status FROM answer_detail WHERE answer_id = ?;
        `;
        const [rows] = await db.execute(sql, [answer_id]);
        return rows;
    }
}
