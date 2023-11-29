import {NextResponse} from "next/server";
import {deleteQuestionBank} from "@/service/question-bank";


export async function DELETE(request, {params}) {

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