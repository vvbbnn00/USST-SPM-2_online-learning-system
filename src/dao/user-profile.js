import {db} from "@/dao/connection";
import {generateUpdateFields} from "@/utils/db";
import {doBcrypt} from "@/utils/security";

export default class UserProfileDAO {
    static async update({user_id,password,avatar = null}) {

        password = doBcrypt(password)

        const [updateFields,params] = generateUpdateFields({password, avatar});

        console.log(updateFields)

        const sql = `
            UPDATE user
            SET ${updateFields}
            WHERE user_id = ?;
        `
        params.push(user_id);
        const [rows] = await db.query(sql, params);

        return rows?.affectedRows === 1;

    }
}
