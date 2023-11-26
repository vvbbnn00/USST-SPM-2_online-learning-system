"use server"

import {z} from 'zod'
import {redirect} from "next/navigation";
import {getIpAddressFromRequest} from "@/utils/ip";
import {login} from "@/service/user";
import {cacheStore} from "@/utils/session";
import {setLoginStatus} from "@/utils/auth";

const schema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
})

export default async function doLogin(formData) {
    const ip = getIpAddressFromRequest();
    let validated
    try {
        validated = schema.parse({
            username: formData.get('username'),
            password: formData.get('password'),
        })
    } catch (error) {
        return redirect('/login?error=' + encodeURIComponent("用户名或密码错误"))
    }

    const failedCount = Number(await cacheStore.get(`login:login_failed_${ip}`));
    if (failedCount && failedCount >= 3) {
        return redirect('/login?error=' + encodeURIComponent("登录失败次数过多，请稍后再试"))
    }

    try {
        const user = await login({
            username: validated.username,
            password: validated.password,
            ip
        });

        await setLoginStatus({
            userId: user.user_id,
            username: user.username,
            role: user.role,
            name: user.name,
            avatar: user.avatar,
            employeeId: user.employee_id,
        }).catch((err) => {
            console.error("[login/actions.js] setLoginStatus error: ", err);
        });
        await cacheStore.del(`login:login_failed_${ip}`);

    } catch (e) {
        await cacheStore.set(`login:login_failed_${ip}`, failedCount ? failedCount + 1 : 1, "EX", 300);
        return redirect('/login?error=' + encodeURIComponent(e.message))
    }

    return redirect('/')
}

