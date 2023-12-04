import {NextResponse} from "next/server";
import {getQuestionList} from "@/service/question";
import {isLogin, isTeacher} from "@/utils/auth";

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
        console.error("[api/question/%5Bqid%5D/route.js] GET error: ", e);
        return NextResponse.json({
            code: 500,
            message: e.message
        }, {
            status: 500
        });
    }
}
