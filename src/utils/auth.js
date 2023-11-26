"use server";

import {session} from "@/utils/session";

const DEBUG = false;

/**
 * 判断用户是否拥有某个角色
 * @param checkRole
 * @returns {Promise<*|boolean>}
 */
export async function hasRole(checkRole) {
    if (DEBUG) return true;
    const s = await session();
    const role = await s.get('role');
    switch (checkRole) {
        case 'admin':
            return role === 'admin' || role === 'teacher'; // 在设计伊始，admin和teacher都拥有admin权限
        case 'teacher':
            return role === 'teacher';
        case 'student':
            return role === 'student';
        default:
            return false;
    }
}


/**
 * 判断用户是否登录
 * @returns {Promise<boolean>}
 */
export async function isLogin() {
    if (DEBUG) return true;
    const s = await session();
    return await s.get('userId');
}

/**
 * 判断用户是否拥有admin权限
 * @returns {Promise<boolean>}
 */
export async function isAdmin() {
    // 在设计伊始，admin和teacher都拥有admin权限
    return await hasRole('admin') || await hasRole('teacher');
}

/**
 * 判断用户是否拥有teacher权限
 * @returns {Promise<*|boolean>}
 */
export async function isTeacher() {
    return await hasRole('teacher');
}

/**
 * 判断用户是否拥有student权限
 * @returns {Promise<*|boolean>}
 */
export async function isStudent() {
    return await hasRole('student');
}

/**
 * 获取用户数据
 * @returns {Promise<{roleList: *, username: *, userId: *}>}
 */
export async function getUserData() {
    if (DEBUG) return {
        userId: 1,
        username: 'admin',
        role: 'admin',
        name: '管理员',
        avatar: 'https://img.aitboy.cn/2021/08/18/20210818103825.png',
        employeeId: 1,
    };
    const s = await session();
    const userId = await s.get('userId');
    const username = await s.get('username');
    const role = await s.get('role');
    const name = await s.get('name');
    const avatar = await s.get('avatar');
    const employeeId = await s.get('employeeId');

    if (!userId || !username || !role || !name || !avatar || !employeeId) {
        return null;
    }

    return {
        userId,
        username,
        role,
        name,
        avatar,
        employeeId,
    };
}


/**
 * 设置登录状态
 */
export async function setLoginStatus({userId, username, role, name, avatar, employeeId}) {
    if (DEBUG) return;
    const s = await session();
    await s.set('userId', userId);
    await s.set('username', username);
    await s.set('role', role);
    await s.set('name', name);
    await s.set('avatar', avatar);
    await s.set('employeeId', employeeId);
}

/**
 * 清除登录状态
 */
export async function clearLoginStatus() {
    if (DEBUG) return;
    const s = await session();
    await s.destroy();
}
