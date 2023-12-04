import {db} from "@/dao/connection";

export default class LogDAO {

    static async addLog({time, type, detail, user_id}) {
        time = new Date(time);

        const sql = `
            INSERT INTO log(time, type, detail, user_id) VALUES(?, ?, ?, ?);
        `;
        const params = [time, type, detail, user_id];
        const [rows] = await db.execute(sql, params);
        return rows.insertId > 0;
    }

    static async queryMany({page, pageSize, kw=null, type=null, userId=null}) {
        const search = [];
        const params = [];

        if (kw) {
            search.push(`detail LIKE ?`);
            params.push(`%${kw}%`);
        }
        if (type) {
            search.push(`type = ?`);
            params.push(type);
        }
        if (userId) {
            search.push(`user_id = ?`);
            params.push(userId);
        }

        params.push((page - 1) * pageSize);
        params.push(pageSize);

        const sql = `
            SELECT
                log_id, time, type, detail, log.user_id as user_id, username, name
            FROM log
            JOIN user on log.user_id = user.user_id
            ${search.length > 0 ? 'WHERE ' + search.join(' AND ') : ''}
            ORDER BY time DESC
            LIMIT ?, ?;
        `;

        const [rows] = await db.query(sql, params);
        return rows;
    }

    static async count({kw=null, type=null, userId=null}) {
        const search = [];
        const params = [];

        if (kw) {
            search.push(`detail LIKE ?`);
            params.push(`%${kw}%`);
        }
        if (type) {
            search.push(`type = ?`);
            params.push(type);
        }
        if (userId) {
            search.push(`user_id = ?`);
            params.push(userId);
        }

        const sql = `
            SELECT COUNT(*) as count
            FROM log
            ${search.length > 0 ? 'WHERE ' + search.join(' AND ') : ''};
        `;
        const [rows] = await db.query(sql, params);
        return rows[0].count;
    }
}
