import AnswerDAO from "@/dao/answer";
import AnswerDetailDao from "@/dao/answer_detail";
import AnswerDetailDAO from "@/dao/answer_detail";
import {getQuestion} from "@/service/question";

export async function getUserExamData({userId, questionBankId}) {
    let answer = await AnswerDAO.queryAnswer({
        user_id: userId,
        question_bank_id: questionBankId
    });

    if (answer.length === 0) {
        const answerId = await AnswerDAO.insertAnswer({
            user_id: userId,
            question_bank_id: questionBankId
        });
        answer = [{
            answer_id: answerId,
            user_id: userId,
            question_bank_id: questionBankId,
            status: '未上交'
        }];
    }

    answer = answer[0];
    const answerList = await AnswerDetailDAO.queryAnswerDetailList({
        answer_id: answer.answer_id
    });

    const answerMap = {};

    answerList.forEach((item) => {
        answerMap[item.question_id] = item;
    });

    return {
        answer,
        answerMap
    };
}


export async function updateAnswerStatus({answerId, status}) {
    const answer = await AnswerDAO.queryAnswerById({
        answer_id: answerId
    });
    if (!answer) {
        throw new Error('答题记录不存在');
    }

    const result = await AnswerDAO.updateAnswerStatus({
        answer_id: answerId,
        status
    });

    if (!result) {
        throw new Error('更新失败');
    }

    return result;
}


export async function queryAnswerList({userId, questionBankId}) {
    return (await AnswerDAO.queryAnswer({
        user_id: userId,
        question_bank_id: questionBankId
    })).map(item => {
        return {
            answer_id: item.answer_id,
            user_id: item.user_id,
            question_bank_id: item.question_bank_id,
            status: item.status,
            user: {
                userId: item.user_id,
                username: item.username,
                name: item.name,
                employeeId: item.employee_id,
                avatar: item.avatar
            }
        }
    });
}


export async function queryAnswerById({answerId}) {
    return await AnswerDAO.queryAnswerById({
        answer_id: answerId
    });
}


export async function queryAnswerDetailList({answerId}) {
    return await AnswerDetailDao.queryAnswerDetailList({
        answer_id: answerId
    });
}

export async function updateAnswerDetail({answerId, questionId, answerContent, score, status = "unchecked"}) {
    const answer = await AnswerDAO.queryAnswerById({
        answer_id: answerId
    });
    if (!answer) {
        throw new Error('答题记录不存在');
    }
    const question = await getQuestion({question_id: questionId});
    if (question?.question_bank_id !== answer.question_bank_id) {
        throw new Error('参数错误');
    }

    if (question.is_subjective) {
        status = 'unchecked';
    } else {
        status = 'checked';
        score = (question.question_option.answer).toString() === (answerContent).toString() ? question.percentage : 0;
    }

    // console.log({
    //     answer_id: answerId,
    //     question_id: questionId,
    //     answer: answerContent,
    //     score,
    //     status
    // }, question.question_option.answer, answerContent);

    await AnswerDetailDao.updateAnswerDetail({
        answer_id: answerId,
        question_id: questionId,
        answer: answerContent,
        score,
        status
    });
}


export async function teacherUpdateAnswerScore({answerId, questionId, score}) {
    const answer = await AnswerDAO.queryAnswerById({
        answer_id: answerId
    });
    if (!answer) {
        throw new Error('答题记录不存在');
    }
    const question = await getQuestion({question_id: questionId});
    if (question?.question_bank_id !== answer.question_bank_id) {
        throw new Error('参数错误');
    }
    const answerDetail = await AnswerDetailDao.queryAnswerDetail({
        answer_id: answerId,
        question_id: questionId
    });
    const result = await AnswerDetailDao.updateAnswerDetail({
        answer_id: answerId,
        question_id: questionId,
        answer: answerDetail.answer,
        score,
        status: 'checked'
    });
    if (!result) {
        throw new Error('更新失败');
    }

    const answerList = await AnswerDetailDao.queryAnswerDetailList({
        answer_id: answerId
    });
    if (answerList.every((item) => item.status === 'checked')) {
        await updateAnswerStatus({
            answerId,
            status: '已批改'
        });
    }
}
