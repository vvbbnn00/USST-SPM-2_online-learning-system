"use server"

import {z} from 'zod'
import {redirect} from "next/navigation";
import {getIpAddressFromRequest} from "@/utils/ip";

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
        return redirect('/user/login?error=Username or password is incorrect.')
    }

    try {
        // await loginUser({
        //     username: validated.username,
        //     password: validated.password,
        //     ip
        // });
    } catch (e) {
        return redirect('/user/login?error=' + e.message)
    }

    return redirect('/user/dashboard')
}

