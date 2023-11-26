import {db} from "@/dao/connection";

export default class UserDAO {
    static async query({user_id = null, username = null, withPassword = false}) {
        // 如果没有传入user_id和username，返回null
        if (!user_id && !username) {
            return null;
        }

        const sql = `
            SELECT user_id, username, ${withPassword ? 'password,' : ''} name, employee_id, role, avatar 
            FROM user
            WHERE ${user_id ? 'user_id = ?' : 'username = ?'}
            LIMIT 1;
        `
        const params = [user_id || username];
        const [rows] = await db.query(sql, params);
        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    }

    static async queryMany({kw = null, role = null, page = 1, pageSize = 10}) {
        const search = [];
        const params = [];
        if (kw) {
            search.push('username LIKE ? OR name LIKE ? OR employee_id LIKE ?');
            params.push([`%${kw}%`, `%${kw}%`, `%${kw}%`]);
        }
        if (role) {
            search.push('role = ?');
            params.push(role);
        }

        const sql = `
            SELECT user_id, username, name, employee_id, role, avatar 
            FROM user
            WHERE true ${search.length > 0 ? 'AND ' + search.join(' AND ') : ''}
            LIMIT ?, ?;
        `
        params.push((page - 1) * pageSize);
        params.push(pageSize);

        const [rows] = await db.query(sql, params);
        return rows;
    }


    static async count({kw = null, role = null}) {
        const search = [];
        const params = [];
        if (kw) {
            search.push('username LIKE ? OR name LIKE ? OR employee_id LIKE ?');
            params.push([`%${kw}%`, `%${kw}%`, `%${kw}%`]);
        }
        if (role) {
            search.push('role = ?');
            params.push(role);
        }

        const sql = `
            SELECT COUNT(*) AS count
            FROM user
            WHERE true ${search.length > 0 ? 'AND ' + search.join(' AND ') : ''};
        `
        const [rows] = await db.query(sql, params);
        return rows[0].count;
    }

    static async delete({user_id = null, username = null}) {
        // 如果没有传入user_id和username，返回null
        if (!user_id && !username) {
            return false;
        }

        const user = await this.query({user_id, username});
        if (!user) {
            return false;
        }

        const sql = `
            DELETE FROM user
            WHERE ${user_id ? 'user_id = ?' : 'username = ?'};
        `
        const params = [user_id || username];
        const [rows] = await db.query(sql, params);
        return rows?.affectedRows === 1;
    }
}
