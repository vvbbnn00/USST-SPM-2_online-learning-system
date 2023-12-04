import UserDAO from "@/dao/user";
import {doCompare} from "@/utils/security";
import LogDAO from "@/dao/log";
import {getUserData} from "@/utils/auth";

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


export async function getUserInfo({userId}) {
    const user = await UserDAO.query({user_id: userId});
    if (!user) {
        throw new Error('用户不存在');
    }

    return {
        userId: user.user_id,
        username: user.username,
        name: user.name,
        employeeId: user.employee_id,
        role: user.role,
        avatar: user.avatar,
    };
}


export async function getUserList({page = 1, pageSize = 10, kw = null, role = null}) {
    const result = await UserDAO.queryMany({
        page,
        pageSize,
        kw,
        role
    });
    const count = await UserDAO.count({
        kw,
        role
    });

    const userList = [];
    for (let user of result) {
        userList.push({
            userId: user.user_id,
            username: user.username,
            name: user.name,
            employeeId: user.employee_id,
            role: user.role,
            avatar: user.avatar,
        })
    }

    return {
        count,
        userList
    }
}


export async function updateUserInfo({userId, username, password, role, name, employeeId, avatar}) {
    const user = await UserDAO.query({user_id: userId});
    if (!user) {
        throw new Error('用户不存在');
    }

    const result = await UserDAO.update({
        user_id: userId,
        username,
        password,
        role,
        name,
        employee_id: employeeId,
        avatar,
    });

    if (!result) {
        throw new Error('更新失败');
    }
}


export async function addUser({username, password, role, name, employeeId, avatar}) {
    const user = await UserDAO.query({username: username});
    if (user) {
        throw new Error('用户名已存在');
    }

    const result = await UserDAO.insert({
        username,
        password,
        role,
        name,
        employee_id: employeeId,
        avatar,
    });

    if (!result) {
        throw new Error('添加失败');
    }

    return result;
}


export async function deleteUser({userId}) {
    const user = await UserDAO.query({user_id: userId});
    if (!user) {
        throw new Error('用户不存在');
    }

    if (user.user_id === (await getUserData()).userId) {
        throw new Error('不能删除自己');
    }

    const result = await UserDAO.remove({user_id: userId});
    if (!result) {
        throw new Error('删除失败');
    }
}
