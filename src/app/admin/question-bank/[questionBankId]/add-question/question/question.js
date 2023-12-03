"use client";

import React from "react";
import SingleQuestion from "@/app/admin/question-bank/[questionBankId]/add-question/question/single";
import MultipleQuestion from "@/app/admin/question-bank/[questionBankId]/add-question/question/multiple";
import TextQuestion from "@/app/admin/question-bank/[questionBankId]/add-question/question/text";

export default function Question({questionDetail, onAnswerChange, index = null}) {

    return <div>
        <div className={"text-medium pb-2 select-none"}>
            <b>{index !== null ? `${index + 1}. ` : null}</b>
            {questionDetail.question_content}
        </div>
        {/*这里需要获取value 下面这个是用的之前的*/}
        {
            (questionDetail.question_option.type === 'single') &&
            <SingleQuestion options={questionDetail.question_option.options}
                            answer={questionDetail.question_option.answer}
                            onAnswerChange={onAnswerChange}
            />
        }
        {
            (questionDetail.question_option.type === 'multiple') &&
            <MultipleQuestion options={questionDetail.question_option.options}
                              answer={questionDetail.question_option.answer}
                              onAnswerChange={onAnswerChange}
            />
        }
        {
            (questionDetail.question_option.type === 'text') &&
            <TextQuestion options={questionDetail.question_option.options}
                          answer={questionDetail.question_option.answer}
                          onAnswerChange={onAnswerChange}
            />
        }
        <div>
            <div className={"text-sm pt-2 text-green-800"}>
                <b>参考答案：</b>
                {questionDetail.question_option.type === 'multiple' ? questionDetail.question_option.answer.split(",").map((item, index) => {
                    return <span key={index}>{questionDetail.question_option.options[index]}; </span>
                }) : null}
                {questionDetail.question_option.type === 'single' ? questionDetail.question_option.options[questionDetail.question_option.answer] : null}
                {questionDetail.question_option.type === 'text' ? questionDetail.question_option.answer : null}
            </div>
        </div>
    </div>
}
