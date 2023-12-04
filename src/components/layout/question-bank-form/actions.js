"use server"

import {z} from "zod";
import {isTeacher} from "@/utils/auth";
import {createQuestionBank, updateQuestionBank} from "@/service/question-bank";

const questionBankSchema = z.object({
    questionBankId: z.number().min(1).nullable(),
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    status: z.enum(["已发布", "未发布", "已结束"]),
    percentage: z.number().min(0).max(100),
})

export async function formCreateQuestionBank(_, formData) {
    if (!await isTeacher()) {
        return {
            code: 403,
            message: "您没有权限进行此操作"
        }
    }

    let questionBankId = formData.get('question_bank_id') || undefined;
    const title = formData.get('title');
    const status = formData.get('status');
    const description = formData.get('description');
    const percentage = formData.get('percentage');


    let validated
    try {
        validated = questionBankSchema.parse({
            questionBankId: questionBankId ? Number(questionBankId) : null,
            title,
            description,
            status,
            percentage: Number(percentage),
        })
    } catch (error) {
        console.error(error)
        return {
            code: 400,
            message: "请检查输入的内容，然后重试"
        }
    }

    try {
        if (questionBankId) {
            await updateQuestionBank(validated)
        } else {
            questionBankId = await createQuestionBank({
                title: validated.title,
                description: validated.description,
                status: validated.status,
                percentage: validated.percentage,
            });
        }

        return {
            code: 200,
            message: "操作成功",
            questionBankId: questionBankId
        }
    } catch (e) {
        return {
            code: 500,
            message: e.message
        }
    }
}