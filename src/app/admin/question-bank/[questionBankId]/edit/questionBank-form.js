"use client";
import React, {useEffect} from "react";
import {Button, Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import {useFormState, useFormStatus} from "react-dom";
import {formCreateQuestionBank} from "@/components/layout/content-form/actions";

const Submit = () => {
    const {pending} = useFormStatus();

    return <Button
        auto
        type={"submit"}
        color={"primary"}
        size={"lg"}
        className={"w-full"}
        isLoading={pending}
    >
        保存
    </Button>
}

export default function QuestionBankForm({QuestionBank}) {

    const [state, formAction] = useFormState(formCreateQuestionBank, {});

    useEffect(() => {
        if (state?.code === 200) {
            location.href = `/admin/question-bank`;
        }
    },[state]);

    return(
        <div className={"w-[500px]"}>
            <form className={"flex flex-col gap-5"} action={formAction}>

                {
                    (state?.code && state?.code !== 200) &&
                    <div className={"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"}
                         role="alert">
                        <strong className={"font-bold"}>
                            {QuestionBank ? "更新" : "创建"}失败：
                        </strong>
                        <span className={"block sm:inline"}>{state?.message}</span>
                    </div>
                }

                <input name={"question_bank_id"} type={"hidden"} value={QuestionBank?.question_bank_id}/>
                <Input
                    label={"题库名称"}
                    isRequired
                    size={"lg"}
                    type={"text"}
                    name={"title"}
                    minLength={1}
                    maxLength={255}
                    defaultValue={QuestionBank?.title}
                />
                <Input
                    type="number"
                    label="总评占比"
                    placeholder="0.00"
                    size={"lg"}
                    isRequired
                    endContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">%</span>
                        </div>
                    }
                    min={0}
                    max={100}
                    step={0.01}
                    name={"percentage"}
                    defaultValue={QuestionBank?.percentage}
                />
                <Select
                    label="发布状态"
                    placeholder="设置题库的发布状态"
                    size={"lg"}
                    isRequired
                    name={"status"}
                >
                    <SelectItem value={"已发布"} key={"已发布"}>
                        {"已发布"}
                    </SelectItem>
                    <SelectItem value={"未发布"} key={"未发布"}>
                        {"未发布"}
                    </SelectItem>
                </Select>
                <Textarea
                    label="题库描述"
                    placeholder="请输入题库描述"
                    size="lg"
                    isRequired
                    name={"description"}
                    defaultValue={QuestionBank?.description}
                />

                <div>
                    <Submit/>
                </div>

                <div className="text-default-500 text-small mt-1">
                    请合理分配总评占比，总评占比总和应为100%。
                </div>

            </form>
        </div>
    )

}