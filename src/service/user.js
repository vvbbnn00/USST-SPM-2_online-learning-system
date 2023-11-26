import UserDAO from "@/dao/user";
import {doBcrypt} from "@/utils/security";
import LogDAO from "@/dao/log";

export async function login(username, password) {
    username = username.trim();
    password = password.trim();

    if (!username || !password) {
        throw new Error('用户名或密码不能为空');
    }

    const user = await UserDAO.query({username: username, withPassword: true});
    if (!user) {
        throw new Error('用户名或密码错误');
    }

    const hashPassword = doBcrypt(password);
    if (user.password !== hashPassword) {
        throw new Error('用户名或密码错误');
    }

    LogDAO.addLog({
        time: new Date(),
        type: 'login',
        detail: '用户登录',
        user_id: user.user_id
    }).catch((err) => {
        console.trace("[service/user.js] LogDAO.addLog error: ", err);
    });

    return user;
}

