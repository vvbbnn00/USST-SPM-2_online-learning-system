import {db} from "@/dao/connection";

export default class QuestionDAO {
    static async query({question_id}) {
            const sql = `
            SELECT question_content,question_option
            FROM question
            WHERE question_id = ?;
        `
        const params = [question_id];
        const [rows] = await db.query(sql, params);
        return rows[0];
    }

    static async queryMany({question_bank_id}) {
        const sql = `
            SELECT question_id, question_bank_id, title, description, status, percentage
            FROM question
            WHERE question_bank_id = ?
        `
        const params = [question_bank_id];
        const [rows] = await db.query(sql, params);
        return rows;
    }


    static async remove({question_id}) {
        const sql = `
            DELETE FROM question
            WHERE question_id = ?;
        `
        const params = [question_id];
        await db.query(sql, params);
    }

    static async insert({question_content,question_option,is_subjective,question_bank_id}) {
        const sql = `
            INSERT INTO question (question_content,question_option,is_subjective,question_bank_id)
            VALUES (?, ?, ?, ?);
        `
        const params = [question_content,question_option,is_subjective,question_bank_id];
        const [rows] = await db.query(sql, params);
        return rows.insertId;
    }

    static async update({question_id, question_content,question_option,is_subjective}) {
        const sql = `
            UPDATE question SET question_content = ?,question_option = ?,is_subjective = ? WHERE question_id = ?;
        `;
        const params = [question_content,question_option,is_subjective,question_id];
        await db.execute(sql, params);
    }

}