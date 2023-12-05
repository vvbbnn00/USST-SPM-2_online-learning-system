"use client";
import {Chip, User} from "@nextui-org/react";
import useSWR from "swr";
import Link from "next/link";

export default function AnswerListPanel({questionBankId, answerId}) {
    const {
        data,
        error,
        isLoading
    } = useSWR(`/api/question-bank/${questionBankId}/answer/list`, (url) => fetch(url).then(res => res.json()));

    return <>
        {/*Left Panel*/}
        <div className={"fixed top-20 mt-20 left-5 h-[500px] w-[300px] bg-white shadow-xl rounded-xl z-50"}>
            <div className={"text-center text-gray-950 font-bold text-xl p-5"}>
                批改名单
            </div>
            <div className={"overflow-y-auto h-[400px] p-2.5"}>
                {data?.data?.map((item, index) =>
                    <Link href={`/exam/${questionBankId}/answer/${item.answer_id}`}
                          key={index}>
                        <div
                            className={"flex items-center justify-between p-5 hover:bg-gray-100 cursor-pointer border " +
                                (parseInt(item.answer_id) === parseInt(answerId) ? "border-gray-500" : "border-transparent")
                            }
                        >
                            <User
                                name={item.user.name}
                                avatar={item.user.avatar}
                                description={`学号：${item.user.employeeId}`}
                            />
                            <>
                                {item.status === '已上交' && <Chip color={"primary"}>已上交</Chip>}
                                {item.status === '未上交' && <Chip color={"warning"} variant={"flat"}>未上交</Chip>}
                                {item.status === '已批改' && <Chip color={"success"} variant={"flat"}>已批改</Chip>}
                            </>
                        </div>
                    </Link>
                )}
                {isLoading && <div className={"text-center text-gray-500 text-sm"}>
                    加载中...
                </div>}
                {error && <div className={"text-center text-red-800 text-sm"}>
                    加载失败
                </div>}
            </div>
        </div>
    </>
}
