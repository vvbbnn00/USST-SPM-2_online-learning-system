"use server"
import React from "react";
import NavBarComp from "@/components/layout/navbar";
import {Button, Chip, Image, Link, Tooltip, User} from "@nextui-org/react";
import ContentList from "@/app/content/content-list";
import {getUserData, isLogin, isStudent, isTeacher} from "@/utils/auth";
import {IconAdd} from "@/components/icons/IconAdd";
import {getContentList} from "@/service/content";
import {redirect} from "next/navigation";
import {searchQuestionBankList} from "@/service/question-bank";
import {getUserExamData, queryAnswerList} from "@/service/answer";

export default async function Exams() {
    if (!await isLogin()) {
        return redirect("/login")
    }
    const user = await getUserData();

    const examList = await searchQuestionBankList({
        status: ["已发布", "已结束"],
        page: 1,
        pageSize: 100,
    });

    const examRecord = await queryAnswerList({
        userId: user?.userId
    });

    const examRecordMap = {}

    for (const record of examRecord) {
        examRecordMap[record.question_bank_id] = record;
    }

    // console.log(examList, examRecord);

    return <>
        <NavBarComp route={"/exam"}/>

        <div className={"flex justify-center"}>
            <div className={"w-[1024px] p-10 pl-5 pr-5 bg-white shadow-xl mt-10 rounded-xl gap-5 flex flex-col"}>
                {
                    examList.map(async (exam, index) => {
                        return <div className={"border flex items-center hover:bg-gray-100"} key={index}>
                            <div className={"flex flex-col gap-2.5 p-5 w-4/5 pl-10 pr-10"}>
                                <div className={"flex text-gray-950 font-bold text-xl gap-2.5 items-center"}>
                                    {exam.status === "已发布" && <Chip color={"primary"}>已发布</Chip>}
                                    {exam.status === "已结束" && <Chip>已结束</Chip>}
                                    <span>{exam.title}</span>
                                </div>
                                <div className={"text-gray-600 text-sm line-clamp-2"}>
                                    {exam.description}
                                </div>
                                <div>
                                    <div className={"flex items-center text-gray-600"}>
                                        <b>分数占比：</b>
                                        <span>{Number(exam.percentage).toFixed(2)}%</span>
                                    </div>
                                    {
                                        examRecordMap[exam.question_bank_id] &&
                                        <div className={"flex items-center text-gray-600"}>
                                            <b>答题状态：</b>
                                            <span>{examRecordMap[exam.question_bank_id].status}</span>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className={"w-1/5 flex items-center justify-center flex-col gap-1.5"}>
                                {
                                    (exam.status === "已发布" && await isStudent() &&
                                        (
                                            !examRecordMap[exam.question_bank_id] ||
                                            examRecordMap[exam.question_bank_id].status === '未上交'
                                        )
                                    ) &&
                                    <Link
                                        href={`/exam/${exam.question_bank_id}`}
                                    >
                                        <div
                                            className={"text-gray-600 hover:text-gray-800 cursor-pointer hover:underline active:text-gray-950 select-none"}>
                                            开始答题
                                        </div>
                                    </Link>
                                }
                                {
                                    await isTeacher() &&
                                    <>
                                        <Link
                                            href={`/exam/${exam.question_bank_id}`}
                                        >
                                            <div
                                                className={"text-gray-600 hover:text-gray-800 cursor-pointer hover:underline active:text-gray-950 select-none"}>
                                                预览试题
                                            </div>
                                        </Link>
                                        <Link
                                            href={`/exam/${exam.question_bank_id}/answer`}
                                        >
                                            <div
                                                className={"text-gray-600 hover:text-gray-800 cursor-pointer hover:underline active:text-gray-950 select-none"}>
                                                阅卷
                                            </div>
                                        </Link>
                                    </>
                                }
                                {
                                    (examRecordMap[exam.question_bank_id] && examRecordMap[exam.question_bank_id].status === '已批阅') &&
                                    <div
                                        className={"text-gray-600 hover:text-gray-800 cursor-pointer hover:underline active:text-gray-950 select-none"}>
                                        查看答题
                                    </div>
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </>
}
