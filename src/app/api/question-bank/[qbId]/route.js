import {NextResponse} from "next/server";
import {deleteQuestionBank} from "@/service/question-bank";
import {getUserData, isTeacher} from "@/utils/auth";


export async function DELETE(request, {params}) {
    const user = await getUserData();
    if (!user) return NextResponse.json({
        code: 401,
        message: '请先登录'
    }, {
        status: 401
    });


    const {qbId} = params;

    if (!qbId) {
        return NextResponse.json({
            code: 400,
            message: '参数错误'
        }, {
            status: 400
        });
    }

    if (!await isTeacher()) {
        return NextResponse.json({
            code: 403,
            message: '无权限'
        }, {
            status: 403
        });
    }

    try {
        await deleteQuestionBank({questionBankId:qbId});
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
