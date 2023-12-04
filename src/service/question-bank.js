import QuestionBankDAO from "@/dao/question-bank";
import {getUserData} from "@/utils/auth";
import LogDAO from "@/dao/log";
import QuestionDAO from "@/dao/question";

export async function getQuestionBankTotal({kw = null, status = null}) {
    const ret = await QuestionBankDAO.count({
        kw: kw,
        status: status
    });
    if (!ret) {
        throw new Error('获取题库总数失败');
    }
    return ret;
}

export async function searchQuestionBankList({kw = null, status = null, page = 1, pageSize = 10}) {
    const ret = await QuestionBankDAO.queryMany({
        kw: kw,
        status: status,
        page: page,
        pageSize: pageSize
    });
    if (!ret) {
        throw new Error('搜索题库失败');
    }
    return ret;
}

export async function getQuestionBank({question_bank_id}) {
    const ret = await QuestionBankDAO.query({
        question_bank_id: question_bank_id
    });
    if (!ret) {
        throw new Error('题库不存在');
    }
    const total = await QuestionDAO.countTotalPercent({
        question_bank_id: question_bank_id,
    });

    return {
        ...ret,
        total: total
    };

}

export async function deleteQuestionBank({questionBankId}) {

    const userData = await getUserData();

    LogDAO.addLog({
        time: new Date(),
        type: 'question-bank',
        detail: `用户: ${userData.username}, 删除题库: ${questionBankId}`,
        user_id: userData.userId
    }).catch((err) => {
        console.error("[service/question-bank-bank.js] LogDAO.addLog error: ", err);
    })

    const ret = await QuestionBankDAO.remove({
        questionBankId: questionBankId
    });
    if (!ret) {
        throw new Error('删除题库失败');
    }
}

export async function createQuestionBank({title, description, status, percentage}) {

    if (status !== '未发布') {
        throw new Error('题库状态不正确');
    }

    const userData = await getUserData();

    LogDAO.addLog({
        time: new Date(),
        type: 'question-bank',
        detail: `用户: ${userData.username}, 创建题库: ${title}`,
        user_id: userData.userId
    }).catch((err) => {
        console.error("[service/question-bank-bank.js] LogDAO.addLog error: ", err);
    })

    const question_bank_id = await QuestionBankDAO.insert({
        title: title,
        description: description,
        status: status,
        percentage: percentage
    });

    if (!question_bank_id) {
        throw new Error('创建题库失败');
    }

    return question_bank_id;
}

export async function updateQuestionBank({questionBankId, title, description, status, percentage}) {
    const userData = await getUserData();

    LogDAO.addLog({
        time: new Date(),
        type: 'question-bank',
        detail: `用户: ${userData.username}, 更新题库: ${questionBankId}`,
        user_id: userData.userId
    }).catch((err) => {
        console.error("[service/question-bank-bank.js] LogDAO.addLog error: ", err);
    })

    const ret = await QuestionBankDAO.update({
        questionBankId: questionBankId,
        title: title,
        description: description,
        status: status,
        percentage: percentage
    });
    if (!ret) {
        throw new Error('更新题库失败');
    }
}

export async function duplicateQuestionBank({questionBankId}) {
    const userData = await getUserData();

    LogDAO.addLog({
        time: new Date(),
        type: 'question-bank',
        detail: `用户: ${name}, 复制题库: ${questionBankId}`,
        user_id: userData.userId
    }).catch((err) => {
        console.error("[service/question-bank-bank.js] LogDAO.addLog error: ", err);
    })

    const ret = await QuestionBankDAO.duplicate({
        questionBankId: questionBankId
    });
    if (!ret) {
        throw new Error('复制题库失败');
    }
}
