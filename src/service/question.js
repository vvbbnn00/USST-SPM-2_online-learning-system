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
    try {
        ret.question_option = JSON.parse(ret.question_option);
    } catch (e) {
        console.error("[service/question.js] getQuestion JSON.parse error: ", e);
        ret.question_option = {};
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

export async function createQuestion({question_content, question_option, is_subjective, question_bank_id, percentage}) {
    const total = await QuestionDAO.countTotalPercent({
        question_bank_id: question_bank_id,
    });
    if (total + percentage > 100) {
        throw new Error('总评占比总和不能超过100%');
    }

    const ret = await QuestionDAO.insert({
        question_content: question_content,
        question_option: JSON.stringify(question_option),
        is_subjective: is_subjective,
        question_bank_id: question_bank_id,
        percentage: percentage
    });
    if (!ret) {
        throw new Error('创建题目失败');
    }
    return ret;
}

export async function updateQuestion({question_id, question_content, question_option, is_subjective, percentage}) {
    const question = await QuestionDAO.query({
        question_id: question_id
    });
    if (!question) {
        throw new Error('题目不存在');
    }

    const total = await QuestionDAO.countTotalPercent({
        question_bank_id: question.question_bank_id,
        exclude_question_id: question_id
    });
    if (total + percentage > 100) {
        throw new Error('总评占比总和不能超过100%');
    }

    const ret = await QuestionDAO.update({
        question_id: question_id,
        question_content: question_content,
        question_option: JSON.stringify(question_option),
        is_subjective: is_subjective,
        percentage: percentage
    });
    if (!ret) {
        throw new Error('更新题目失败');
    }
    return ret;
}


export async function getQuestionList({question_bank_id}) {
    const ret = await QuestionDAO.queryMany({
        question_bank_id: question_bank_id
    });
    if (!ret) {
        throw new Error('获取题目列表失败');
    }
    return ret.map(item => {
        try {
            item.question_option = JSON.parse(item.question_option);
        } catch (e) {
            console.error("[service/question.js] getQuestionList JSON.parse error: ", e);
            item.question_option = {};
        }
        return item;
    });
}
