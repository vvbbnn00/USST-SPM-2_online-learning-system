"use client"
import {Button, Checkbox, CheckboxGroup, Input} from "@nextui-org/react";
import React from "react";

export default function MultipleEdit({questionOption, onOptionChange}) {
    const MAX_SELECTION = 10;

    const defaultAnswer = [];
    if (questionOption?.answer) {
        defaultAnswer.push(...questionOption?.answer.split(",").map(item => (parseInt(item) + 1).toString()))
    }

    const [multipleChoice, setMultipleChoice] = React.useState(defaultAnswer);

    const defaultSelectionList = [];
    if (questionOption?.options) {
        for (let key in questionOption?.options) {
            defaultSelectionList.push({
                label: key,
                value: key,
                input: questionOption?.options[key]
            })
        }
    }

    const [multipleChoiceList, setMultipleChoiceList] = React.useState(defaultSelectionList || [
        {
            label: 1,
            value: 1,
            input: ""
        },
        {
            label: 2,
            value: 2,
            input: ""
        }
    ]);

    React.useEffect(() => {
        const answerSet = (new Set(multipleChoice.sort().map(item => (item - 1).toString())));
        const answerList = answerSet.size > 0 ? [...answerSet] : [];
        onOptionChange({
            answer: answerList.join(","),
            options: multipleChoiceList.map((item) => item.input),
            type: "multiple"
        })
    }, [multipleChoiceList, multipleChoice]);

    return <div className={"flex justify-center w-full pb-5"}>
        <div className={"w-[800px] flex flex-col gap-5"}>
            <CheckboxGroup
                value={multipleChoice}
                onValueChange={setMultipleChoice}
            >
                {multipleChoiceList.map((item, index) => (
                    <div className={"flex items-center"} key={index}>
                        <Checkbox
                            value={item.value}
                            name={"question_option"}
                        ></Checkbox>
                        <Input
                            label={`选项${item.label}`}
                            className={"mr-2.5"}
                            isRequired
                            size={"sm"}
                            type={"text"}
                            minLength={1}
                            maxLength={255}
                            value={item.input}
                            onChange={(e) => {
                                const value = e.target.value;
                                setMultipleChoiceList(multipleChoiceList.map((item, i) => {
                                    if (i === index) {
                                        return {
                                            ...item,
                                            input: value
                                        }
                                    }
                                    return item
                                }))
                            }}
                        />
                        <Button
                            auto
                            label={"删除选项"}
                            size={"sm"}
                            onClick={() => {
                                if (multipleChoiceList.length > 0) {
                                    setMultipleChoiceList(multipleChoiceList.filter((_, i) => i !== index))
                                }
                            }}
                        >
                            删除
                        </Button>
                    </div>
                ))}
            </CheckboxGroup>
            <Button
                auto
                label={"添加选项"}
                size={"sm"}
                onClick={() => {
                    if (multipleChoiceList.length < MAX_SELECTION) {
                        setMultipleChoiceList([...multipleChoiceList, {
                            label: multipleChoiceList.length + 1,
                            value: multipleChoiceList.length + 1
                        }])
                    }
                }}
            >
                添加选项
            </Button>
        </div>
    </div>
}
