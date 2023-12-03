"use client";
import React, {useEffect} from "react";
import QuestionEditForm
    from "@/app/admin/question-bank/[questionBankId]/add-question/question-config/question-edit-form";
import Question from "@/app/admin/question-bank/[questionBankId]/add-question/question/question";


export default function QuestionEditBoard({question_bank_id}) {
    const [selectedQuestionId, setSelectedQuestionId] = React.useState(null);

    const question = [
        {
            question_id: 1,
            question_content: "维特根斯坦的名言“世界是我所以的”是指",
            question_option: {
                options: [
                    "世界是我所以的，我是世界的主宰",
                    "世界是我所以的，我是世界的创造者",
                    "世界是我所以的，我是世界的主人",
                    "世界是我所以的，我是世界的主体"
                ],
                answer: "2",
                type: "single"
            },
            is_subjective: 0,
            question_bank_id: question_bank_id
        },
        {
            question_content: "多选题1",
            question_option: {
                options: ["A2", "B2", "C2", "D2"],
                answer: "1,2",
                type: "multiple"
            },
            is_subjective: 1,
            question_bank_id: question_bank_id,
        },
        {
            question_content: "简答题1",
            question_option: {
                answer: "answer1",
                type: "text"
            },
            is_subjective: 0,
            question_bank_id: 1
        }
    ]


    return (
        <div className={"flex justify-center w-full p-10 pt-2.5"}>
            <div className={"w-full"}>
                <div className={"pt-1 pb-10"}>
                    <div className={"flex bg-white p-5 rounded-xl shadow-xl"}>

                        {/*editFrame*/}
                        <div className={"flex flex-col justify-start w-1/2 md:w-1/4"}>
                            <QuestionEditForm qbId={question_bank_id}/>
                        </div>

                        {/*previewFrame*/}
                        <div className={"flex flex-col justify-start w-1/2 md:w-3/4"}>
                            <div className={"flex justify-center p-5"}>
                                <span className={"text-gray-750 font-bold text-xl"}>题目预览</span>
                            </div>
                            <div className={"flex flex-col gap-2.5 p-2.5 border m-5 mt-0 rounded"}>
                                {question.map((item, index) => (
                                    <div
                                        key={index}
                                        className={"p-2.5 border" + (selectedQuestionId === index ? " border-gray-200" : " border-transparent")}
                                        onClick={() => setSelectedQuestionId(index)}
                                    >
                                        <Question questionDetail={item} index={index}/>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}
