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
}
