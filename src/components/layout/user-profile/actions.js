"use server"
import {z} from "zod";
import {updateUserProfile} from "@/service/user-profile";

const userProfileSchema = z.object({
    userId: z.number().min(1).nullable(),
    origin_password: z.string().max(255).nullable(),
    password: z.string().max(255).nullable(),
    avatar: z.string().max(255).nullable(),
})

export async function formUpdateUserProfile(_, formData) {
    let userId = formData.get('user_id');
    const origin_password = formData.get('origin_password');
    const password = formData.get('password');
    const avatar = formData.get('avatar');

    let validated
    try {
        validated = userProfileSchema.parse({
            userId: userId ? Number(userId) : null,
            origin_password,
            password,
            avatar,
        })
        // console.log(validated)
    } catch (error) {
        return {
            code: 400,
            message: "请检查输入的内容，然后重试"
        }
    }

    try {
        if (userId) {
            await updateUserProfile(validated)
        } else {
            return {
                code: 400,
                message: "不存在该用户ID"
            }
        }

        return {
            code: 200,
            message: "更新成功",
        }
    } catch (error) {
        // console.error(error)
        return {
            code: 500,
            message: error.message
        }
    }
}