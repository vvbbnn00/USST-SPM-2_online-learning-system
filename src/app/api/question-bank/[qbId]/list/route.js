import {NextResponse} from "next/server";
import {getQuestionList} from "@/service/question";
import {isLogin, isTeacher} from "@/utils/auth";
import {getQuestionBank} from "@/service/question-bank";

export async function GET(request, {params}) {
    if (!await isLogin()) {
        return NextResponse.json({
            code: 401,
            message: '未登录'
        }, {
            status: 401
        });
    }
    const {qbId} = params;
    if (!qbId) {
        return NextResponse.json({
            code: 400,
            message: '参数错误'
        }, {
            status: 400
        });
    }

    try {
        const questionBankDetail = await getQuestionBank({question_bank_id: qbId});
        if (!await isTeacher() && questionBankDetail.status !== '已发布') {
            return NextResponse.json({
                code: 403,
                message: '无权限'
            }, {
                status: 403
            });
        }

    } catch (e) {
        console.error("[api/question/[qid]/route.js] GET error: ", e);
        return NextResponse.json({
            code: 500,
            message: e.message
        }, {
            status: 500
        });
    }


    try {
        const question = await getQuestionList({question_bank_id: qbId});
        if (!await isTeacher()) {
            question.forEach((item) => {
                delete item?.question_option?.answer;
            })
        }
        return NextResponse.json({
            code: 200,
            message: 'ok',
            data: question
        });
    } catch (e) {
        console.error("[api/question/[qid]/route.js] GET error: ", e);
        return NextResponse.json({
            code: 500,
            message: e.message
        }, {
            status: 500
        });
    }
}
