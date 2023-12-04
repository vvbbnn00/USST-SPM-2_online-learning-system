"use client";
import Question from "@/components/question/question";
import useSWR from "swr";
import {useEffect, useState} from "react";

export default function ExamBody({examId, examDetail}) {
    const {
        data,
        error,
        isLoading
    } = useSWR(`/api/question-bank/${examId}/list`, (url) => fetch(url).then(res => res.json()));

    const [answer, setAnswer] = useState({});

    useEffect(() => {
        fetch(`/api/question-bank/${examId}/answer`, {
            method: "GET"
        }).then(res => res.json()).then(res => {
            if (res.code !== 200) {
                return;
            }
            setAnswer(res.data.answerMap);
            console.log("answer", res.data.answerMap);
        })
    }, []);

    const onAnswerChange = ({questionId, answer}) => {
        console.log("onAnswerChange", questionId, answer);
        fetch(`/api/question-bank/${examId}/answer`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionId,
                answer
            })
        }).then(res => res.json()).then(res => {
            console.log("onAnswerChange res", res);
        })
    }

    return <div className={"bg-white p-5 shadow-xl w-full m-5"}>
        <div className={"flex flex-col justify-start"}>
            <div className={"flex justify-center p-5"}>
                <span className={"text-gray-750 font-bold text-xl"}>{examDetail.title}</span>
            </div>
            <div className={"flex justify-end p-1 pr-7 text-gray-600"}>
                总分：{examDetail?.total.toFixed(2)}
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
                            <Question
                                questionDetail={item}
                                index={index}
                                onAnswerChange={onAnswerChange}
                                answer={answer[item.question_id]?.answer}/>
                        </div>
                    ))}
                </div>}
        </div>
    </div>
}
