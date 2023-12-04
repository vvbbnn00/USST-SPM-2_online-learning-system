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
