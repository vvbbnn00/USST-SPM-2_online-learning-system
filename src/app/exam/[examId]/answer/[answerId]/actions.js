"use server";
import {isTeacher} from "@/utils/auth";
import {getQuestion} from "@/service/question";
import {teacherUpdateAnswerScore} from "@/service/answer";

export async function doUpdateScore(_, formData) {
    if (!await isTeacher()) {
        return {
            code: 403,
            message: "权限不足"
        }
    }
    let answerId = formData.get("answerId");
    let score = formData.get("score");
    let questionId = formData.get("questionId");
    if (!answerId || !score || !questionId) {
        return {
            code: 400,
            message: "参数错误"
        }
    }
    answerId = Number(answerId);
    score = Number(score);
    questionId = Number(questionId);

    if (isNaN(answerId) || isNaN(score) || isNaN(questionId)) {
        return {
            code: 400,
            message: "参数错误"
        }
    }

    if (score < 0) {
        return {
            code: 400,
            message: "分数不能为负数"
        }
    }

    const question = await getQuestion({question_id: questionId});
    if (!question) {
        return {
            code: 400,
            message: "题目不存在"
        }
    }
    const maxScore = Number(question.percentage);
    if (score > maxScore) {
        return {
            code: 400,
            message: "分数不能超过题目分数"
        }
    }

    try {
        await teacherUpdateAnswerScore({
            answerId,
            questionId,
            score
        })
    } catch (error) {
        return {
            code: 500,
            message: error.message
        }
    }

    return {
        code: 200,
        message: "操作成功",
        score
    }
}
