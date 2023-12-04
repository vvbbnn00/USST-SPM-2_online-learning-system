"use server";
import {Button, Link} from "@nextui-org/react";
import {getQuestionBank} from "@/service/question-bank";
import {notFound, redirect} from "next/navigation";
import ExamBody from "@/app/exam/[examId]/exam-body";
import {isLogin, isTeacher} from "@/utils/auth";

export default async function ExamPage({params}) {
    if (!await isLogin()) {
        return redirect("/login");
    }

    const {examId} = params;

    const questionBankDetail = await getQuestionBank({question_bank_id: examId});
    if (questionBankDetail == null) {
        return notFound();
    }
    if (!await isTeacher() && questionBankDetail.status !== '已发布') {
        return notFound();
    }

    return <div>
        <div className={"flex justify-center fixed top-0 left-0 right-0 z-50"}>
            <div className={"flex justify-center w-full"}>
                <div className={"w-full"}>
                    <div className={"flex backdrop-blur bg-white bg-opacity-70 p-5 shadow-xl"}>
                        <div className={"w-1/5"}>
                            <Button
                                as={Link}
                                href={`/exam`}
                                variant={"faded"}
                            >
                                &lt; 返回
                            </Button>
                        </div>

                        <div className={"justify-center p-1.5 w-3/5 flex"}>
                            <div className={"flex gap-2.5 items-center ml-14"}>
                                <span
                                    className={"text-gray-950 font-bold text-xl"}>测试 - {questionBankDetail.title}</span>
                            </div>
                        </div>

                        <div className={"w-1/5 flex justify-end"}>
                            <Button
                                color={"primary"}
                            >
                                交卷
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div className={"flex justify-center w-full"}>
            <div className={"flex justify-center pt-20 w-[990px]"}>
                <ExamBody examId={examId} examDetail={questionBankDetail}/>
            </div>
        </div>

    </div>

}
