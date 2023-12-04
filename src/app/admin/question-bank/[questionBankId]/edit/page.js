"use server"

import {isTeacher} from "@/utils/auth";
import {notFound} from "next/navigation";
import {getQuestionBank} from "@/service/question-bank";
import QuestionBankForm from "@/app/admin/question-bank/[questionBankId]/edit/questionBank-form";
import NavBarComp from "@/components/layout/navbar";
import {Button, Link} from "@nextui-org/react";
import {IconEdit} from "@/components/icons/IconEdit";
import React from "react";
import {IconEditQuestion} from "@/components/icons/IconEditQuestion";

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
                        <div className={"flex"}>
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
                        <div className={"items-center justify-end"}>
                            {await isTeacher() && (questionBankDetail.status === "未发布") &&
                                <Button
                                    as={Link}
                                    href={`/admin/question-bank/${questionBankDetail.question_bank_id}/add-question`}
                                    color={"default"}
                                    startContent={<IconEdit fill={"#737373"}/>}
                                >
                                    查看&编辑题目
                                </Button>
                            }
                            {
                                await isTeacher() && (questionBankDetail.status === "已发布" || questionBankDetail.status === "已结束" ) &&
                                <Button
                                    as={Link}
                                    href={`/exam/${questionBankDetail.question_bank_id}?from=qb`}
                                    color={"default"}
                                    startContent={<IconEditQuestion fill={"#737373"}/>}
                                >
                                    预览试题
                                </Button>
                            }
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
