import {db} from "@/dao/connection";
import {generateUpdateFields} from "@/utils/db";
import {doBcrypt} from "@/utils/security";
import UserDAO from "@/dao/user";

export default class UserProfileDAO {
    static async update({user_id, password = null, avatar = null}) {

        const userData = await UserDAO.query({user_id, withPassword: true});
        if (password === '') {
            password = userData.password;
        } else {
            password = doBcrypt(password)
        }

        const [updateFields, params] = generateUpdateFields({password, avatar});

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
