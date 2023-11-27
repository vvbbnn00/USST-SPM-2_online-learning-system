"use server"

import {z} from 'zod'
import {isAdmin} from "@/utils/auth";
import {updateCourseConfig} from "@/service/course";

const schema = z.object({
    courseName: z.string().min(1).max(255),
    courseDescription: z.string().min(1),
    courseId: z.string().min(1).max(255),
    courseType: z.enum(["选修", "必修"]),
    courseCover: z.string().url().nullable().optional()
})

export async function formEditSystemConfig(_, formData) {
    if (!await isAdmin()) {
        return {
            code: 403,
            message: "您没有权限进行此操作"
        }
    }

    const courseName = formData.get('courseConfig.courseName');
    const courseDescription = formData.get('courseConfig.courseDescription');
    const courseId = formData.get('courseConfig.courseId');
    const courseType = formData.get('courseConfig.courseType');
    const courseCover = formData.get('courseConfig.courseCover') || undefined;

    let validated
    try {
        validated = schema.parse({
            courseName,
            courseDescription,
            courseId,
            courseType,
            courseCover: courseCover ? courseCover : undefined,
        })
    } catch (error) {
        console.error(error)
        return {
            code: 400,
            message: "请检查输入的内容，然后重试"
        }
    }

    try {
        await updateCourseConfig(validated)

        return {
            code: 200,
            message: "更新成功，请刷新页面查看最新数据",
        }
    } catch (e) {
        return {
            code: 500,
            message: e.message
        }
    }
}
