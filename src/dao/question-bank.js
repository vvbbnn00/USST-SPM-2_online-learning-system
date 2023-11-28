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
        const [rows] = await db.query(sql, params);
        return rows[0].total;
    }

    static async query({question_bank_id}) {
        const sql = `
            SELECT question_bank_id, title, description, status, percentage
            FROM question_bank
            WHERE question_bank_id = ?;
        `
        const params = [question_bank_id];
        const [rows] = await db.query(sql, params);
        return rows[0];
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
            search.push('status = ?');
            params.push(status);
        }

        const sql = `
            SELECT question_bank_id, title, description, status, percentage
            FROM question_bank
            WHERE true ${search.length > 0 ? 'AND ' + search.join(' AND ') : ''}
            LIMIT ?, ?;
        `
        params.push((page - 1) * pageSize);
        params.push(pageSize);

        const [rows] = await db.query(sql, params);
        return rows;
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
        const [rows] = await db.query(sql, params);
        return rows?.affectedRows === 1;
    }

    static async insert({title, description, status, percentage}) {
        const totalPercentageSQL = `
            SELECT SUM(percentage) as total_percentage
            FROM question_bank;
        `
        const [sum] = await db.query(totalPercentageSQL);
        const totalPercentage = sum[0]?.total_percentage;
        if (totalPercentage + percentage > 100) {
            throw new Error('总评占比总和不能超过100%');
        }

        const sql = `
            INSERT INTO question_bank(title, description, status, percentage)
            VALUES (?, ?, ?, ?);
        `
        console.log(title, description, status, percentage)

        const params = [title, description, status, percentage];
        const [rows] = await db.query(sql, params);
        return rows.insertId;
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
        const [rows] = await db.execute(sql, params);
        return rows.affectedRows > 0;
    }

}