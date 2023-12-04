"use client"
import QuestionHeaderBar from "@/app/admin/question-bank/[questionBankId]/add-question/add-question-headerbar";
import QuestionEditBoard from "@/app/admin/question-bank/[questionBankId]/add-question/add-question-editboard";
import React from "react";

export default function QuestionBody({questionBankDetail, question_bank_id}) {
    const [createQuestionSignal, setCreateQuestionSignal] = React.useState(Date.now());
    const onCreateQuestion = () => {
        setCreateQuestionSignal(Date.now());
    }

    return <>
        <div className={"flex justify-center fixed top-0 left-0 right-0 z-50"}>
            <QuestionHeaderBar questionBankDetail={questionBankDetail} onCreateQuestion={onCreateQuestion}/>
        </div>

        <div className={"flex justify-center pt-20"}>
            <QuestionEditBoard questionBankDetail={questionBankDetail} question_bank_id={question_bank_id} createQuestionSignal={createQuestionSignal}/>
        </div>
    </>
}
