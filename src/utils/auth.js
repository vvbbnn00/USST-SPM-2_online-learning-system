"use server";

import {session} from "@/utils/session";

const DEBUG = true;

/**
 * 判断用户是否拥有某个角色
 * @param role
 * @returns {Promise<*|boolean>}
 */
export async function hasRole(role) {
    if (DEBUG) return true;
    const s = await session();
    const roleList = await s.get('roleList');
    if (!roleList) return false;
    return roleList.includes(role);
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
        roleList: ['admin', 'teacher', 'student']
    };
    const s = await session();
    const userId = await s.get('userId');
    const username = await s.get('username');
    const roleList = await s.get('roleList');

    if (!userId || !username || !roleList) return null;

    return {
        userId,
        username,
        roleList
    }
}
