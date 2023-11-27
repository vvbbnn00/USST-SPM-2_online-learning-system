import {db} from "@/dao/connection";
import {generateUpdateFields} from "@/utils/db";

export default class ContentDAO {
    /**
     * 获取教学材料列表
     * @returns any
     *
     * 返回的格式应当是一个数组，数组中包括了所有的教学材料
     */
    static async queryListWithPercentage() {
        const sql = `
            SELECT 
                    content.content_id as content_id, content_title as name, 
                    type, chapter, content.file_id as file_id, can_download, 
                    (SELECT COUNT(*) FROM progress WHERE progress.content_id = content.content_id AND progress.status = 'finished') as progress_finished,
                    (SELECT COUNT(*) FROM user WHERE user.role = 'student') as progress_total
            FROM content
            LEFT JOIN file on content.file_id = file.file_id
            GROUP BY content_id;
        `;
        const [rows] = await db.execute(sql);
        return rows;
    }

    static async queryById({content_id}) {
        const sql = `
            SELECT
                content_id, content_title as name, 
                chapter, file_id, can_download, percentage
            FROM content
            WHERE content.content_id = ?
            LIMIT 1;
        `;
        const params = [content_id];
        const [rows] = await db.execute(sql, params);
        return rows[0];
    }

    static async insert({content_title, chapter, file_id, can_download, percentage}) {
        const totalPercentageSQL = `
            SELECT SUM(percentage) as total_percentage
            FROM content;
        `;
        const totalPercentageParams = [chapter];
        const [rows] = await db.execute(totalPercentageSQL, totalPercentageParams);
        const totalPercentage = rows[0]?.total_percentage;
        if (totalPercentage + percentage > 100) {
            throw new Error('平时分占比总和不能超过100%');
        }

        const sql = `
            INSERT INTO content(content_title, chapter, file_id, can_download, percentage) VALUES(?, ?, ?, ?, ?);
        `;
        const params = [content_title, chapter, file_id, can_download, percentage];
        const [rows2] = await db.execute(sql, params);
        return rows2.insertId;
    }

    static async update({content_id, content_title, chapter, file_id, can_download, percentage}) {
        can_download = can_download ? 1 : 0;

        const [updateFields, params] = generateUpdateFields({
            content_title, chapter, file_id, can_download, percentage
        });

        if (updateFields.length === 0) {
            throw new Error('没有需要更新的字段');
        }

        const sql = `
            UPDATE content SET ${updateFields.join(', ')} WHERE content_id = ?;
        `;
        params.push(content_id);
        const [rows] = await db.execute(sql, params);
        return rows.affectedRows > 0;
    }
}
