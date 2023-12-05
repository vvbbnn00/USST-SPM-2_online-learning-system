import {isTeacher} from "@/utils/auth";
import {notFound, redirect} from "next/navigation";
import {queryAnswerList} from "@/service/answer";
import {NextResponse} from "next/server";

export async function GET(_, {params}) {
    if (!await isTeacher()) {
        return notFound();
    }
    const {examId} = params;
    const answerList = await queryAnswerList({
        questionBankId: examId
    })

    console.log(answerList)

    if (!answerList.length) {
        return NextResponse.json({
            code: 400,
            message: "暂时没有学生提交答案"
        }, {
            status: 400
        })
    }

    return redirect(`/exam/${examId}/answer/${answerList[0].answer_id}`)
}
