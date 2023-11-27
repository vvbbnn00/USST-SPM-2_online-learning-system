import {db} from "@/dao/connection";

export default class CourseDAO {
    static COURSE_KEYS = ["course_cover", "course_description", "course_id", "course_name", "course_type"];

    /**
     * 获取课程配置信息
     * @returns any
     */
    static async queryConfig({keys}) {
        if (!keys) {
            keys = this.COURSE_KEYS;
        }

        const whereFields = [];
        const params = [];
        keys.forEach(key => {
            whereFields.push(`${"`"}key${"`"} = ?`);
            params.push(key);
        });

        if (whereFields.length === 0) {
            return {};
        }

        const sql = `
            SELECT ${"`"}key${"`"}, ${"`"}value${"`"}
            FROM course
            WHERE ${whereFields.join(" OR ")};
        `;

        const [rows] = await db.execute(sql, params);
        const result = {};
        rows.forEach(row => {
            result[row.key] = row.value;
        });
        return result;
    }

    static async updateConfig(conf) {
        const params = [];
        const placeholders = [];
        Object.keys(conf).forEach(key => {
            if (!conf[key]) {
                return;
            }
            params.push(key);
            params.push(conf[key]);
            placeholders.push("(?, ?)");
        });

        if (params.length === 0) {
            throw new Error('没有需要更新的字段');
        }

        const sql = `
            REPLACE INTO course(${"`"}key${"`"}, ${"`"}value${"`"}) VALUES ${placeholders.join(", ")};
        `;
        const [rows] = await db.execute(sql, params);
        return rows;
    }
}
