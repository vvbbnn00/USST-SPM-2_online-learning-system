"use server"

import {z} from 'zod'
import {isTeacher} from "@/utils/auth";
import {createContent, updateContent} from "@/service/content";

const schema = z.object({
    contentId: z.number().min(1).nullable(),
    name: z.string().min(1).max(255),
    chapter: z.string().min(1).max(255),
    permission: z.enum(["view", "download"]),
    percentage: z.number().min(0).max(100),
    uploadId: z.number().min(1)
})

export async function formCreateContent(_, formData) {
    if (!await isTeacher()) {
        return {
            code: 403,
            message: "您没有权限进行此操作"
        }
    }

    let contentId = formData.get('contentId') || undefined;
    const name = formData.get('name');
    const chapter = formData.get('chapter');
    const permission = formData.get('permission');
    const percentage = formData.get('percentage');
    const uploadId = formData.get('uploadId');

    if (!uploadId) {
        return {
            code: 400,
            message: "请先点击“上传”按钮上传文件"
        }
    }

    let validated
    try {
        validated = schema.parse({
            contentId: contentId ? Number(contentId) : null,
            name,
            chapter,
            permission,
            percentage: Number(percentage),
            uploadId: Number(uploadId),
        })
    } catch (error) {
        console.error(error)
        return {
            code: 400,
            message: "请检查输入的内容，然后重试"
        }
    }

    try {
        if (contentId) {
            await updateContent(validated)
        } else {
            contentId = await createContent({
                name: validated.name,
                chapter: validated.chapter,
                permission: validated.permission,
                percentage: validated.percentage,
                uploadId: validated.uploadId,
            });
        }

        return {
            code: 200,
            message: "操作成功",
            contentId: contentId
        }
    } catch (e) {
        return {
            code: 500,
            message: e.message
        }
    }
}
