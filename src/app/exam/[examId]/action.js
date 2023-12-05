"use server"
import {getUserData, isLogin, isStudent} from "@/utils/auth";
import {getUserExamData, updateAnswerStatus} from "@/service/answer";

export async function doStudentSubmit(_, formData) {
    const user = await getUserData();
    if (!await isLogin()) {
        return {
            code: 401,
            message: "请先登录"
        }
    }
    if (!await isStudent()) {
        return {
            code: 403,
            message: "权限不足"
        }
    }

    const examId = formData.get("examId");
    if (!examId) {
        return {
            code: 400,
            message: "参数错误"
        }
    }

    const examData = await getUserExamData({
        examId: examId,
        userId: user.userId
    });

    if (examData.answer.status === '已上交' || examData.answer.status === '已批阅') {
        return {
            code: 200,
            message: "已提交"
        }
    }

    try {
        await updateAnswerStatus({
            answerId: examData.answer.answer_id,
            status: '已上交'
        });
    } catch (error) {
        return {
            code: 500,
            message: error.message
        }
    }

    return {
        code: 200,
        message: "提交成功"
    }
}
