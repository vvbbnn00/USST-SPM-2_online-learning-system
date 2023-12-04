import {NextResponse} from "next/server";
import {deleteQuestion, getQuestion} from "@/service/question";
import {isLogin, isTeacher} from "@/utils/auth";


export async function DELETE(request, {params}) {
    if (!await isLogin()) {
        return NextResponse.json({
            code: 401,
            message: '请先登录'
        }, {
            status: 401
        })
    }
    if (!await isTeacher()) {
        return NextResponse.json({
            code: 403,
            message: '您没有权限这么做'
        }, {
            status: 403
        })
    }
    const {qid} = params;

    if (!qid) {
        return NextResponse.json({
            code: 400,
            message: '参数错误'
        }, {
            status: 400
        });
    }

    try {
        await deleteQuestion({question_id: qid});
        return NextResponse.json({
            code: 200,
            message: 'ok'
        });
    } catch (e) {
        console.error("[api/question-bank/%5BqbId%5D/route.js] DELETE error: ", e);
        return NextResponse.json({
            code: 500,
            message: e.message
        }, {
            status: 500
        });
    }
}


export async function GET(request, {params}) {
    if (!await isLogin()) {
        return NextResponse.json({
            code: 401,
            message: '请先登录'
        }, {
            status: 401
        })
    }
    if (!await isTeacher()) {
        return NextResponse.json({
            code: 403,
            message: '您没有权限这么做'
        }, {
            status: 403
        })
    }
    const {qid} = params;

    if (!qid || isNaN(qid)) {
        return NextResponse.json({
            code: 400,
            message: '参数错误'
        }, {
            status: 400
        });
    }

    try {
        const questionBankDetail = await getQuestion({question_id: qid});
        return NextResponse.json({
            code: 200,
            message: 'ok',
            data: questionBankDetail
        });
    } catch (e) {
        console.error("[api/question-bank/%5BqbId%5D/route.js] GET error: ", e);
        return NextResponse.json({
            code: 500,
            message: e.message
        }, {
            status: 500
        });
    }
}
