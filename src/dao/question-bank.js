import {db} from "@/dao/connection";
import {generateUpdateFields} from "@/utils/db";

export default class QuestionBankDAO {
    static async count({kw = null, status = null}) {
        const search = [];
        const params = [];
        if (status === "全部" || status === "undefined") {
            status = null;
        }
        if (kw) {
            search.push('title LIKE ? ');
            params.push([`%${kw}%`]);
        }
        if (status) {
            search.push('status = ?');
            params.push(status);
        }

        const sql = `
            SELECT COUNT(*) as total
            FROM question_bank
            WHERE true ${search.length > 0 ? 'AND ' + search.join(' AND ') : ''};
        `
        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows[0].total;
        } finally {
            await db.releaseConnection(conn);
        }
    }

    static async query({question_bank_id}) {
        const sql = `
            SELECT question_bank_id, title, description, status, percentage
            FROM question_bank
            WHERE question_bank_id = ?;
        `
        const params = [question_bank_id];
        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows[0];
        } finally {
            await db.releaseConnection(conn);
        }
    }

    static async queryMany({kw = null, status = null, page = 1, pageSize = 10}) {
        if (status === "全部") {
            status = null;
        }
        const search = [];
        const params = [];
        if (kw) {
            search.push('title LIKE ? ');
            params.push([`%${kw}%`]);
        }
        if (status) {
            if (status instanceof Array) {
                search.push('status IN (?)');
                params.push(status);
            } else {
                search.push('status = ?');
                params.push(status);
            }
        }

        const sql = `
            SELECT question_bank_id, title, description, status, percentage
            FROM question_bank
            WHERE true ${search.length > 0 ? 'AND ' + search.join(' AND ') : ''}
            LIMIT ?, ?;
        `
        params.push((page - 1) * pageSize);
        params.push(pageSize);

        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows;
        } finally {
            await db.releaseConnection(conn);
        }
    }


    static async remove({questionBankId}) {

        if (!questionBankId) {
            return null;
        }

        const sql = `
            DELETE FROM question_bank
            WHERE question_bank_id = ?;
        `

        const params = [questionBankId];
        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows.affectedRows === 1;
        } finally {
            await db.releaseConnection(conn);
        }
    }

    static async insert({title, description, status, percentage}) {
        const conn = await db.getConnection()

        const totalPercentageSQL = `
            SELECT SUM(percentage) as total_percentage
            FROM question_bank;
        `
        const [sum] = await conn.query(totalPercentageSQL);
        const totalPercentage = sum[0]?.total_percentage;

        if (totalPercentage + percentage > 100) {
            db.releaseConnection(conn);
            throw new Error('总评占比总和不能超过100%');
        }

        const sql = `
            INSERT INTO question_bank(title, description, status, percentage)
            VALUES (?, ?, ?, ?);
        `

        const params = [title, description, status, percentage];

        try {
            const [rows] = await conn.query(sql, params);
            return rows.insertId;
        } finally {
            await db.releaseConnection(conn);
        }
    }

    static async update({questionBankId, title, description, status, percentage}) {
        const [updateFields, params] = generateUpdateFields({
            title, description, status, percentage
        });

        if (updateFields.length === 0) {
            throw new Error('没有需要更新的字段');
        }

        const sql = `
            UPDATE question_bank SET ${updateFields.join(', ')} WHERE question_bank_id = ?;
        `;
        params.push(questionBankId);

        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows.affectedRows > 0;
        } finally {
            await db.releaseConnection(conn);
        }
    }

}
