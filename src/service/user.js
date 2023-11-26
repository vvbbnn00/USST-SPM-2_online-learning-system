import UserDAO from "@/dao/user";
import {doCompare} from "@/utils/security";
import LogDAO from "@/dao/log";

export async function login({username, password, ip}) {
    username = username.trim();
    password = password.trim();

    if (!username || !password) {
        throw new Error('用户名或密码不能为空');
    }

    const user = await UserDAO.query({username: username, withPassword: true});
    if (!user) {
        throw new Error('用户名或密码错误');
    }

    const passwordPass = doCompare(password, user.password);
    if (!passwordPass) {
        throw new Error('用户名或密码错误');
    }

    LogDAO.addLog({
        time: new Date(),
        type: 'login',
        detail: '用户登录, IP: ' + ip,
        user_id: user.user_id
    }).catch((err) => {
        console.error("[service/user.js] LogDAO.addLog error: ", err);
    });

    return user;
}


export async function logout({userId, ip}) {
    LogDAO.addLog({
        time: new Date(),
        type: 'logout',
        detail: '用户登出, IP: ' + ip,
        user_id: userId
    }).catch((err) => {
        console.error("[service/user.js] LogDAO.addLog error: ", err);
    });
}
