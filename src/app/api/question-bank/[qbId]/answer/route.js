import {NextResponse} from "next/server";
import {getQuestion, getQuestionList} from "@/service/question";
import {getUserData, isLogin, isStudent, isTeacher} from "@/utils/auth";
import {getQuestionBank} from "@/service/question-bank";
import {getUserExamData, updateAnswerDetail} from "@/service/answer";

async function preCheck({qbId}) {
    if (!await isLogin()) {
        return {
            code: 401,
            message: '未登录'
        };
    }
    if (!await isStudent()) {
        return {
            code: 403,
            message: '无权限'
        };
    }
    if (!qbId) {
        return {
            code: 400,
            message: '参数错误'
        };
    }
    try {
        const questionBankDetail = await getQuestionBank({question_bank_id: qbId});
        if (questionBankDetail.status !== '已发布') {
            return {
                code: 403,
                message: '无权限'
            };
        }
    } catch (e) {
        console.error("[api/question/[qid]/route.js] GET error: ", e);
        return {
            code: 500,
            message: e.message
        };
    }

    return null;
}

export async function GET(request, {params}) {
    const {qbId} = params;
    const preCheckResult = await preCheck({qbId});
    if (preCheckResult) {
        return NextResponse.json(preCheckResult, {
            status: preCheckResult.code
        });
    }
    const user = await getUserData();

    const answer = await getUserExamData({
        userId: user.userId,
        questionBankId: qbId
    });

    const newMap = {};
    for (const item in answer.answerMap) {
        newMap[item] = {
            answer: answer.answerMap[item].answer
        };
    }

    delete answer?.answer?.answer_id;
    delete answer?.answer?.user_id;
    delete answer?.answer?.question_bank_id;

    answer.answerMap = newMap;

    return NextResponse.json({
        code: 200,
        message: 'ok',
        data: answer
    });
}

export async function PUT(request, {params}) {
    const {qbId} = params;
    const preCheckResult = await preCheck({qbId});
    if (preCheckResult) {
        return NextResponse.json(preCheckResult, {
            status: preCheckResult.code
        });
    }
    const user = await getUserData();

    const answerData = await getUserExamData({
        userId: user.userId,
        questionBankId: qbId
    })

    const requestBody = await request.json();
    const {questionId, answer: answerContent} = requestBody;

    if (!questionId) {
        return NextResponse.json({
            code: 400,
            message: '参数错误'
        }, {
            status: 400
        });
    }

    try {
        await updateAnswerDetail({
            answerId: answerData.answer.answer_id,
            questionId,
            answerContent,
            score: 0
        });
    } catch (e) {
        console.error("[api/question/[qid]/route.js] PUT error: ", e);
        return NextResponse.json({
            code: 500,
            message: e.message
        }, {
            status: 500
        });
    }

    return NextResponse.json({
        code: 200,
        message: 'ok'
    });
}


