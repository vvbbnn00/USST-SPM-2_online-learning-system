"use client"
import {Button, Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import SingleEdit from "@/app/admin/question-bank/[questionBankId]/add-question/question-config/single";
import MultipleEdit from "@/app/admin/question-bank/[questionBankId]/add-question/question-config/multiple";
import React, {useEffect} from "react";
import {useFormState, useFormStatus} from "react-dom";
import TextEdit from "@/app/admin/question-bank/[questionBankId]/add-question/question-config/text";
import {doUpdateQuestion} from "@/app/admin/question-bank/[questionBankId]/add-question/question-config/actions";
import {redirect} from "next/navigation";

const Submit = () => {
    const {pending} = useFormStatus();

    return <Button
        auto
        type={"submit"}
        color={"primary"}
        size={"lg"}
        className={"w-[600px] items-center"}
        isLoading={pending}
    >
        保存
    </Button>
}

export default function QuestionEditForm({questionId, qbId, onQuestionUpdate}) {
    const [questionType, setQuestionType] = React.useState(new Set(["单选题"]));
    const [state, formAction] = useFormState(doUpdateQuestion, {});
    const [loading, setLoading] = React.useState(false);
    questionId = questionId ? parseInt(questionId) : undefined;

    const fetchQuestionDetail = async (questionId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/question/${questionId}`);
            const result = await res.json();
            if (result.code === 401) {
                redirect("/login");
            }
            if (result.code !== 200) {
                return null;
            }
            return result.data;
        } catch (e) {
            console.error(e);
            return null;
        } finally {
            setLoading(false);
        }
    }

    const [questionDetail, setQuestionDetail] = React.useState({
        question_id: questionId,
        question_content: "",
        question_option: {},
        is_subjective: 0,
        question_bank_id: qbId
    })


    useEffect(() => {
        console.log("questionId", questionId);
        setQuestionDetail({
            _time: new Date(),
            question_id: questionId,
            question_content: "",
            question_option: {},
            is_subjective: 0,
            question_bank_id: qbId
        });
        setQuestionType(new Set(["单选题"]));

        fetchQuestionDetail(questionId).then((res) => {
            if (!res) {
                return;
            }
            setQuestionDetail(res);
            switch (res.question_option.type) {
                case "single": {
                    setQuestionType(new Set(["单选题"]));
                    break;
                }
                case "multiple": {
                    setQuestionType(new Set(["多选题"]));
                    break;
                }
                case "text": {
                    setQuestionType(new Set(["简答题"]));
                    break;
                }
                default: {
                    setQuestionType(new Set(["单选题"]));
                    break;
                }
            }
        });
    }, [questionId]);

    useEffect(() => {
        if (state?.code === 200) {
            onQuestionUpdate({
                questionId: questionDetail.question_id || state?.question_id
            });
        }
    }, [state]);

    const onOptionChange = (detail) => {
        setQuestionDetail({
            ...questionDetail,
            question_option: detail
        });
    }

    return <>
        <div className={"flex justify-center p-5"}>
            <span className={"text-gray-750 font-bold text-xl"}>题目详情</span>
        </div>
        {loading && <div className={"flex justify-center p-5"}>
            <span className={"text-gray-500"}>加载中...</span>
        </div>}
        {!loading && <form action={formAction}>

            {
                (state?.code && state?.code !== 200) &&
                <div
                    className={"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3.5"}
                    role="alert">
                    <strong className={"font-bold"}>
                        题目更新失败：
                    </strong>
                    <span className={"block sm:inline"}>{state?.message}</span>
                </div>
            }

            <div className={"flex justify-center w-full pb-5"}>
                <div className={"w-[600px] flex flex-col gap-5"}>
                    <Textarea
                        label={"题目描述"}
                        isRequired
                        type={"text"}
                        name={"question_content"}
                        minLength={1}
                        maxLength={2000}
                        defaultValue={questionDetail.question_content}
                    />
                    <Select
                        label="题目类型"
                        selectionMode={"single"}
                        isRequired
                        selectedKeys={questionType}
                        onSelectionChange={setQuestionType}
                    >
                        <SelectItem value={"单选题"} key={"单选题"}>
                            {"单选题"}
                        </SelectItem>
                        <SelectItem value={"多选题"} key={"多选题"}>
                            {"多选题"}
                        </SelectItem>
                        <SelectItem value={"简答题"} key={"简答题"}>
                            {"简答题"}
                        </SelectItem>
                    </Select>
                    <Input
                        name={"percentage"}
                        type={"text"}
                        label={"分值"}
                        isRequired
                        min={1}
                        max={100}
                        defaultValue={questionDetail.percentage}
                    />
                    <input name={"is_subjective"} type={"hidden"}
                           value={(questionType === "单选题" || questionType === "多选题") ? 1 : 0}/>
                    <input name={"question_option"} type={"hidden"}
                           value={JSON.stringify(questionDetail.question_option)}/>
                    <input name={"question_bank_id"} type={"hidden"} value={questionDetail.question_bank_id}/>
                    <input name={"question_id"} type={"hidden"} value={questionDetail.question_id}/>
                    {/*<p className="text-small text-default-500">Selected: {questionType}</p>*/}
                </div>
            </div>

            <hr/>

            <div className={"flex justify-center p-5"}>
                <span className={"text-gray-750 font-bold text-xl"}>题目设置</span>
            </div>
            {
                (questionType.values().next().value === "单选题") &&
                <SingleEdit onOptionChange={onOptionChange} questionOption={questionDetail.question_option}/>
            }
            {
                (questionType.values().next().value === "多选题") &&
                <MultipleEdit onOptionChange={onOptionChange} questionOption={questionDetail.question_option}/>
            }
            {
                (questionType.values().next().value === "简答题") &&
                <TextEdit onOptionChange={onOptionChange} questionOption={questionDetail.question_option}/>
            }


            <div className={"flex justify-center w-full"}>
                <Submit/>
            </div>
        </form>}
    </>
}
