"use server"

import {isTeacher} from "@/utils/auth";
import {notFound} from "next/navigation";
import {getQuestionBank} from "@/service/question-bank";
import QuestionBankForm from "@/app/admin/question-bank/[questionBankId]/edit/questionBank-form";
import NavBarComp from "@/components/layout/navbar";
import {Button, Link} from "@nextui-org/react";

export default async function QuestionBankDetail({params}) {
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
            <div className={"w-[1024px]"}>
                <div className={"pt-10 pb-10"}>

                    <div className={"flex bg-white p-5 rounded-xl shadow-xl"}>
                        <div className={"flex absolute"}>
                            <Button
                                as={Link}
                                href={`/admin/question-bank`}
                                variant={"faded"}
                            >
                                &lt; 返回
                            </Button>
                        </div>

                        <div className={"flex flex-1 justify-center p-1.5"}>
                            <div className={"flex gap-2.5 items-center"}>
                                <span className={"text-gray-950 font-bold text-xl"}>编辑 - {questionBankDetail.title}</span>
                            </div>
                        </div>

                    </div>

                    <div className={"flex bg-white p-10 rounded-xl shadow-xl mt-5 flex-col gap-5 w-full"}>
                        <div className={"w-full justify-center flex"}>
                            <QuestionBankForm QuestionBank={questionBankDetail}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}