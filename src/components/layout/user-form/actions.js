"use server"
import {z} from "zod";
import {addUser, updateUserInfo} from "@/service/user";

const schema = z.object({
    userId: z.number().min(1).nullable().optional(),
    username: z.string().min(2).max(255).regex(/^[a-zA-Z0-9_]+$/),
    password: z.string().min(2).max(255).nullable().optional(),
    role: z.enum(["teacher", "student"]),
    name: z.string().min(1).max(255),
    employeeId: z.string().min(1).max(255),
    avatar: z.string().min(1).max(255).url().nullable().optional(),
})

export async function doUpdateUserInfo(_, formData) {
    let userId = formData.get("userId") || undefined;
    if (userId) {
        userId = Number(userId);
    }
    const username = formData.get("username");
    const password = formData.get("password") || undefined;
    const role = formData.get("role");
    const name = formData.get("name");
    const employeeId = formData.get("employee_id");
    const avatar = formData.get("avatar") || undefined;

    let validated;

    try {
        validated = schema.parse({
            userId,
            username,
            password,
            role,
            name,
            employeeId,
            avatar
        })
    } catch (error) {
        console.error(error)
        return {
            code: 400,
            message: "请检查输入的内容，然后重试"
        }
    }

    try {
        if (validated.userId) {
            await updateUserInfo(validated);
            return {
                code: 200,
                message: "操作成功"
            }
        } else {
            return {
                code: 200,
                message: "操作成功",
                userId: await addUser(validated)
            }
        }
    } catch (error) {
        return {
            code: 500,
            message: error.message
        }
    }



}
