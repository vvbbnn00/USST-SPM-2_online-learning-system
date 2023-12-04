"use server";
import NavBarComp from "@/components/layout/navbar";
import {isTeacher} from "@/utils/auth";
import {notFound} from "next/navigation";
import {getQuestionBank} from "@/service/question-bank";
import QuestionBody from "@/app/admin/question-bank/[questionBankId]/add-question/question-body";


export default async function EditQuestion({params}) {
    if (!await isTeacher()) {
        return notFound();
    }

    const question_bank_id = params.questionBankId;
    const questionBankDetail = await getQuestionBank({question_bank_id});
    if (questionBankDetail == null) {
        return notFound();
    }

    return <>
        <QuestionBody question_bank_id={question_bank_id} questionBankDetail={questionBankDetail}/>
    </>

}
