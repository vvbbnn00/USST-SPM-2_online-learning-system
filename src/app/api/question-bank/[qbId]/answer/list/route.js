import {isTeacher} from "@/utils/auth";
import {queryAnswerList} from "@/service/answer";
import {getQuestionBank} from "@/service/question-bank";
import {NextResponse} from "next/server";

export async function GET(request, {params}) {
    if (!await isTeacher()) {
        return NextResponse.json({
            code: 403,
            message: "权限不足"
        }, {
            status: 403
        })
    }
    const {qbId} = params;

    const questionBankDetail = await getQuestionBank({question_bank_id: qbId});
    if (!questionBankDetail) {
        return NextResponse.json({
            code: 400,
            message: "参数错误"
        }, {
            status: 400
        })
    }

    try {
        const answerList = await queryAnswerList({
            questionBankId: qbId
        });
        return NextResponse.json({
            code: 200,
            data: answerList
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            code: 500,
            message: error.message
        }, {
            status: 500
        })
    }
}
