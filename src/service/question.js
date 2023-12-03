import QuestionDAO from "@/dao/question";
import {getUserData} from "@/utils/auth";
import LogDAO from "@/dao/log";

export async function getQuestion({question_id}) {
    const ret = await QuestionDAO.query({
        question_id: question_id
    });
    if (!ret) {
        throw new Error('获取题目失败');
    }
    return ret;

}

export async function deleteQuestion({question_id}) {

    const userData = await getUserData();

    LogDAO.addLog({
        time: new Date(),
        type: 'question',
        detail: `用户: ${userData.username}, 删除题目: ${question_id}`,
        user_id: userData.userId
    }).catch((err) => {
        console.error("[service/question.js] LogDAO.addLog error: ", err);
    })

    const ret = await QuestionDAO.remove({
        question_id: question_id
    });
    if (!ret) {
        throw new Error('删除题目失败');
    }

}

export async function createQuestion({question_content, question_option, is_subjective, question_bank_id}) {
    const ret = await QuestionDAO.insert({
        question_content: question_content,
        question_option: question_option,
        is_subjective: is_subjective,
        question_bank_id: question_bank_id
    });
    if (!ret) {
        throw new Error('创建题目失败');
    }
    return ret;
}

export async function updateQuestion({question_id, question_content, question_option, is_subjective}) {
    const ret = await QuestionDAO.update({
        question_id: question_id,
        question_content: question_content,
        question_option: question_option,
        is_subjective: is_subjective
    });
    if (!ret) {
        throw new Error('更新题目失败');
    }
    return ret;
}

