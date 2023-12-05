import UserProfileDAO from "@/dao/user-profile";
import UserDAO from "@/dao/user";
import {doCompare} from "@/utils/security";
import LogDAO from "@/dao/log";


export async function updateUserProfile({userId, origin_password, password, avatar}) {

    password = password.trim();

    const userData = await UserDAO.query({user_id: userId, withPassword: true});

    if (origin_password === '' && password === '') {
        const updateResult = await UserProfileDAO.update({
            user_id: userId,
            password: userData.password,
            avatar: avatar
        });
        LogDAO.addLog({
            time: new Date(),
            type: 'changeProfile',
            detail: '用户修改个人信息',
            user_id: userData.user_id
        }).catch((err) => {
            console.error("[service/user.js] LogDAO.addLog error: ", err);
        });
        return updateResult;
    }

    const passwordPass = doCompare(origin_password, userData.password);

    if (!passwordPass) {
        throw new Error('原密码错误或为空');
    }

    if(passwordPass && password === ''){
        throw new Error('新密码为空');
    }

    const updateResult = await UserProfileDAO.update({user_id: userId, password: password, avatar: avatar});

    LogDAO.addLog({
        time: new Date(),
        type: 'changeProfile',
        detail: '用户修改个人信息',
        user_id: userData.user_id
    }).catch((err) => {
        console.error("[service/user.js] LogDAO.addLog error: ", err);
    });

    return updateResult;

}