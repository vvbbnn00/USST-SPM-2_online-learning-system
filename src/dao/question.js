import {db} from "@/dao/connection";

export default class QuestionDAO {
    static async query({question_id}) {
        const sql = `
            SELECT question_content,question_option, is_subjective, question_bank_id, percentage, question_id
            FROM question
            WHERE question_id = ?;
        `
        const params = [question_id];
        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows[0];
        } finally {
            await db.releaseConnection(conn);
        }
    }

    static async queryMany({question_bank_id}) {
        const sql = `
            SELECT question_id, question_content,question_option, is_subjective, question_bank_id, percentage
            FROM question
            WHERE question_bank_id = ?
        `
        const params = [question_bank_id];
        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows;
        } finally {
            await db.releaseConnection(conn);
        }
    }


    static async remove({question_id}) {
        const sql = `
            DELETE FROM question
            WHERE question_id = ?;
        `
        const params = [question_id];
        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows.affectedRows === 1;
        } finally {
            await db.releaseConnection(conn);
        }
    }

    static async countTotalPercent({question_bank_id, exclude_question_id = null}) {
        const sql = `
            SELECT SUM(percentage) as total
            FROM question
            WHERE question_bank_id = ? ${exclude_question_id ? "AND question_id != ?" : ""}
        `
        const params = [question_bank_id];
        if (exclude_question_id) {
            params.push(exclude_question_id);
        }
        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return Number(rows[0].total);
        } finally {
            await db.releaseConnection(conn);
        }
    }

    static async insert({question_content, question_option, is_subjective, question_bank_id, percentage}) {
        const sql = `
            INSERT INTO question (question_content,question_option,is_subjective,question_bank_id, percentage)
            VALUES (?, ?, ?, ?, ?);
        `;
        const params = [question_content, question_option, is_subjective, question_bank_id, percentage];
        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows.insertId;
        } finally {
            await db.releaseConnection(conn);
        }
    }

    static async update({question_id, question_content, question_option, is_subjective, percentage}) {
        const updateList = [];
        const params = [];

        if (question_content) {
            updateList.push("question_content = ?");
            params.push(question_content);
        }
        if (question_option) {
            updateList.push("question_option = ?");
            params.push(question_option);
        }
        if (is_subjective) {
            updateList.push("is_subjective = ?");
            params.push(is_subjective);
        }
        if (percentage) {
            updateList.push("percentage = ?");
            params.push(percentage);
        }
        params.push(question_id);
        const sql = `
            UPDATE question SET ${updateList.join(", ")} WHERE question_id = ?;
        `;
        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows.affectedRows > 0;
        } finally {
            await db.releaseConnection(conn);
        }
    }

}
