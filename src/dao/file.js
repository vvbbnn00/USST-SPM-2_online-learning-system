import {db} from "@/dao/connection";
import {generateUpdateFields} from "@/utils/db";

export default class FileDAO {

    /**
     * 根据文件ID获取文件信息
     * @param fileId
     * @returns any
     */
    static async queryById({file_id}) {
        const sql = `
            SELECT file_id, filename, type, size, storage_id, status, created_at, created_by FROM file WHERE file_id = ?;
        `;
        const params = [file_id];
        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows[0];
        } finally {
            await db.releaseConnection(conn);
        }
    }

    /**
     * 插入文件信息
     * @param filename 文件名
     * @param type 文件类型
     * @param size 文件大小
     * @param storage_id 文件存储ID
     * @param created_by 创建者ID
     * @returns {Promise<number>}
     */
    static async insert({filename, type, size, storage_id, created_by}) {
        const sql = `
            INSERT INTO file(filename, type, size, storage_id, created_by) VALUES(?, ?, ?, ?, ?);
        `;
        const params = [filename, type, size, storage_id, created_by];
        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows.insertId;
        } finally {
            await db.releaseConnection(conn);
        }
    }


    /**
     * 更新文件状态
     * @param file_id 文件ID
     * @param filename 文件名
     * @param type 文件类型
     * @param status 文件状态
     * @param storage_id 文件存储ID
     * @param size 文件大小
     * @returns {Promise<boolean>}
     */
    static async update({file_id, filename = null, type = null, size = null, storage_id = null, status = null}) {
        if (status !== 'uploaded') {
            throw new Error('Invalid status');
        }

        const [updateFields, params] = generateUpdateFields({
            filename, type, size, storage_id, status
        });

        params.push(file_id);

        if (updateFields.length === 0) {
            throw new Error('No field to update');
        }
        const sql = `
            UPDATE file SET ${updateFields.join(', ')} WHERE file_id = ?;
        `;
        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows.affectedRows > 0;
        } finally {
            await db.releaseConnection(conn);
        }
    }

    /**
     * 根据文件ID删除文件
     * @param file_id 文件ID
     * @returns {Promise<boolean>}
     */
    static async deleteById({file_id}) {
        const sql = `
            DELETE FROM file WHERE file_id = ?;
        `;
        const params = [file_id];
        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows.affectedRows > 0;
        } finally {
            await db.releaseConnection(conn);
        }
    }

    /**
     * 获取文件列表
     * @param kw 关键词
     * @param type 文件类型
     * @param page 页码
     * @param pageSize 分页大小
     */
    static async queryMany({kw = null, type = null, page = 1, pageSize = 10}) {
        const search = [];
        const params = [];
        if (kw) {
            search.push('filename LIKE ? ');
            params.push([`%${kw}%`]);
        }
        if (type) {
            search.push('type = ?');
            params.push(type);
        }

        search.push("status = 'uploaded'")

        const sql = `
            SELECT file_id, filename, type, size, storage_id, status, created_at, created_by
            FROM file
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

    /**
     * 获取文件总数
     * @param kw 关键词
     * @param type 文件类型
     */
    static async count({kw = null, type = null}) {
        const search = [];
        const params = [];
        if (kw) {
            search.push('filename LIKE ? ');
            params.push([`%${kw}%`]);
        }
        if (type) {
            search.push('type = ?');
            params.push(type);
        }

        const sql = `
            SELECT COUNT(*) as total
            FROM file
            WHERE true ${search.length > 0 ? 'AND ' + search.join(' AND ') : ''}
        `
        const conn = await db.getConnection()
        try {
            const [rows] = await conn.query(sql, params);
            return rows[0].total;
        } finally {
            await db.releaseConnection(conn);
        }
    }
}
