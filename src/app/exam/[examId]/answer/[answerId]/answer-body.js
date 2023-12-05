"use client";
import Question from "@/components/question/question";
import useSWR from "swr";
import {User} from "@nextui-org/react";
import {useEffect} from "react";
import React from "react";
import UpdateScoreForm from "@/app/exam/[examId]/answer/[answerId]/update-score-form";

export default function AnswerBody({examId, examDetail, answerId, answerMap, user}) {
    const {
        data,
        error,
        isLoading
    } = useSWR(`/api/question-bank/${examId}/list`, (url) => fetch(url).then(res => res.json()));
    const [total, setTotal] = React.useState(0);
    const [lastUpdate, setLastUpdate] = React.useState(Date.now());

    useEffect(() => {
        if (data) {
            const total = data?.data.reduce((acc, item) => {
                return Number(acc) + Number(answerMap[item.question_id]?.score || 0);
            }, 0);
            setTotal(total);
        }
    }, [lastUpdate, data]);

    return <div className={"bg-white p-5 shadow-xl w-full m-5"}>
        <div className={"flex flex-col justify-start"}>
            <div className={"flex justify-start p-5"}>
                <User
                    name={user.name}
                    avatar={user.avatar}
                    description={`学号：${user.employeeId}`}
                />
            </div>
            <div className={"flex justify-end p-1 pr-7 text-gray-600"}>
                分数：{total.toFixed(2)} / {examDetail?.total.toFixed(2)}
            </div>
            {isLoading && <div className={"flex justify-center p-5"}>
                <span className={"text-gray-500"}>加载中...</span>
            </div>}
            {error && <div className={"flex justify-center p-5"}>
                <span className={"text-gray-500"}>加载失败</span>
            </div>}
            {(!isLoading && !error) &&
                <div className={"flex flex-col gap-2.5 mt-0 rounded"}>
                    {data?.data.map((item, index) => (
                        <div key={index}>
                            <div className={"pointer-events-none"}>
                                <Question
                                    questionDetail={item}
                                    index={index}
                                    answer={answerMap[item.question_id]?.answer}/>
                            </div>
                            <UpdateScoreForm score={Number(answerMap[item.question_id]?.score)}
                                             maxScore={Number(item.score)}
                                             questionId={item.question_id}
                                             answerId={answerId}
                                             onChange={(score) => {
                                                 answerMap[item.question_id].score = score;
                                                 setLastUpdate(Date.now());
                                             }}
                            />
                        </div>
                    ))}
                </div>}
        </div>
    </div>
}
