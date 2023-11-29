"use server";
import NavBarComp from "@/components/layout/navbar";
import {isTeacher} from "@/utils/auth";
import {notFound} from "next/navigation";
import {getQuestionBank} from "@/service/question-bank";
import QuestionHeaderBar from "@/app/admin/question-bank/[questionBankId]/add-question/add-question-headerbar";
import QuestionEditBoard from "@/app/admin/question-bank/[questionBankId]/add-question/add-question-editboard";


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
        <NavBarComp route={"/admin/question-bank"}/>

        <div className={"flex justify-center"}>
            <QuestionHeaderBar questionBankDetail={questionBankDetail}/>
        </div>

        <div className={"flex justify-center"}>
            <QuestionEditBoard question_bank_id={question_bank_id}/>
        </div>
    </>

}