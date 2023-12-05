"use server";
import {Button, Link} from "@nextui-org/react";
import {getQuestionBank} from "@/service/question-bank";
import {notFound, redirect} from "next/navigation";
import {isLogin, isTeacher} from "@/utils/auth";
import {queryAnswerById, queryAnswerDetailList} from "@/service/answer";
import {getUserInfo} from "@/service/user";
import AnswerBody from "@/app/exam/[examId]/answer/[answerId]/answer-body";
import AnswerListPanel from "@/app/exam/[examId]/answer/[answerId]/answer-list-panel";

export default async function ExamPage({params}) {
    if (!await isLogin()) {
        return redirect("/login");
    }

    if (!await isTeacher()) {
        return notFound();
    }

    const {examId, answerId} = params;

    const questionBankDetail = await getQuestionBank({question_bank_id: examId})
    if (questionBankDetail == null) {
        return notFound();
    }
    const answerDetail = await queryAnswerById({answerId: answerId});
    if (parseInt(answerDetail?.question_bank_id) !== parseInt(examId)) {
        return notFound();
    }
    const user = await getUserInfo({
        userId: answerDetail.user_id
    });
    const answerDetailList = await queryAnswerDetailList({answerId: answerId});

    const answerMap = {};

    answerDetailList.forEach((item) => {
        answerMap[item.question_id] = item;
    });

    return <div>
        <AnswerListPanel questionBankId={examId} answerId={answerId}/>
        <div className={"flex justify-center fixed top-0 left-0 right-0 z-50"}>
            <div className={"flex justify-center w-full"}>
                <div className={"w-full"}>
                    <div className={"flex backdrop-blur bg-white bg-opacity-70 p-5 shadow-xl"}>
                        <div className={"w-1/5"}>
                            <Button
                                as={Link}
                                href={"/exam"}
                                variant={"faded"}
                            >
                                &lt; 返回
                            </Button>
                        </div>

                        <div className={"justify-center p-1.5 w-3/5 flex"}>
                            <div className={"flex gap-2.5 items-center"}>
                                <span
                                    className={"text-gray-950 font-bold text-xl"}>阅卷 - {questionBankDetail.title} - {user.name}({user.employeeId})</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div className={"flex justify-center w-full"}>
            <div className={"flex justify-center pt-20 w-[990px]"}>
                <AnswerBody
                    examId={examId}
                    examDetail={questionBankDetail}
                    answerMap={answerMap}
                    answerId={answerDetail.answer_id}
                    user={user}/>
            </div>
        </div>

    </div>

}
