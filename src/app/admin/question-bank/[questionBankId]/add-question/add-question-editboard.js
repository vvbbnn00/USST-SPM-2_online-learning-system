"use client";
import React, {useEffect} from "react";
import QuestionEditForm
    from "@/app/admin/question-bank/[questionBankId]/add-question/question-config/question-edit-form";
import Question from "@/components/question/question";
import useSWR from "swr";


export default function QuestionEditBoard({question_bank_id, createQuestionSignal, questionBankDetail}) {
    const [selectedQuestionId, setSelectedQuestionId] = React.useState();
    const [lastUpdate, setLastUpdate] = React.useState(Date.now());
    const {
        data,
        error,
        isLoading
    } = useSWR(`/api/question-bank/${question_bank_id}/list?_t=${lastUpdate}`, (url) => fetch(url).then(res => res.json()));

    const onQuestionUpdate = ({questionId}) => {
        setLastUpdate(Date.now());
        setSelectedQuestionId(questionId);
    }

    useEffect(() => {
        if (createQuestionSignal) {
            setSelectedQuestionId(null);
        }
    }, [createQuestionSignal])

    return (
        <div className={"flex justify-center w-full p-10 pt-2.5"}>
            <div className={"w-full"}>
                <div className={"pt-1 pb-10"}>
                    <div className={"flex bg-white p-5 rounded-xl shadow-xl"}>

                        {/*editFrame*/}
                        <div className={"flex flex-col justify-start w-1/2 md:w-1/4"}>
                            <QuestionEditForm qbId={question_bank_id} questionId={selectedQuestionId}
                                              onQuestionUpdate={onQuestionUpdate}/>
                        </div>

                        {/*previewFrame*/}
                        <div className={"flex flex-col justify-start w-1/2 md:w-3/4"}>
                            <div className={"flex justify-center p-5"}>
                                <span className={"text-gray-750 font-bold text-xl"}>题目预览</span>
                            </div>
                            <div className={"flex justify-end p-1 pr-7 text-gray-600"}>
                                总分：{questionBankDetail?.total.toFixed(2)}
                            </div>
                            {isLoading && <div className={"flex justify-center p-5"}>
                                <span className={"text-gray-500"}>加载中...</span>
                            </div>}
                            {error && <div className={"flex justify-center p-5"}>
                                <span className={"text-gray-500"}>加载失败</span>
                            </div>}
                            {(!isLoading && !error) &&
                                <div className={"flex flex-col gap-2.5 p-2.5 border m-5 mt-0 rounded"}>
                                    {data?.data.map((item, index) => (
                                        <div
                                            key={index}
                                            className={"p-2.5 border transition-all " + (selectedQuestionId === item.question_id ? " border-gray-200 shadow" : " border-transparent")}
                                            onClick={() => setSelectedQuestionId(item.question_id)}
                                        >
                                            <Question questionDetail={item} index={index} onDelete={()=>{
                                                onQuestionUpdate({questionId: null})
                                            }}/>
                                        </div>
                                    ))}
                                </div>}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}
