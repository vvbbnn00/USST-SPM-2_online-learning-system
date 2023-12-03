"use client";
import {Button, Input, Radio, RadioGroup} from "@nextui-org/react";
import React from "react";

export default function SingleEdit({questionOption, onOptionChange}) {
    const MAX_SELECTION = 10;
    const [singleChoice, setSingleChoice] = React.useState(questionOption?.answer + 1 || 1);

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

    const [selectionList, setSelectionList] = React.useState(defaultSelectionList || [
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
        onOptionChange({
            answer: singleChoice ? (singleChoice - 1).toString() : null,
            options: selectionList.map((item) => item.input),
            type: "single"
        })
    }, [selectionList, singleChoice]);

    return <div className={"flex justify-center w-full pb-5"}>
        <div className={"w-[800px] flex flex-col gap-5"}>
            <RadioGroup
                value={singleChoice}
                onValueChange={setSingleChoice}
            >
                {selectionList.map((item, index) => (
                    <div className={"flex items-center"} key={index}>
                        <Radio
                            value={item.value}
                            name={"question_option"}
                        ></Radio>
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
                                setSelectionList(selectionList.map((item, i) => {
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
                                if (selectionList.length > 0) {
                                    setSelectionList(selectionList.filter((_, i) => i !== index))
                                }
                            }}
                        >
                            删除
                        </Button>
                    </div>
                ))}
            </RadioGroup>
            {/*<p className="text-default-500 text-small">Selected: {singleChoice}</p>*/}
            <Button
                auto
                label={"添加选项"}
                size={"sm"}
                onClick={() => {
                    if (selectionList.length < MAX_SELECTION) {
                        setSelectionList([...selectionList, {
                            label: selectionList.length + 1,
                            value: selectionList.length + 1,
                            input: ""
                        }])
                    }
                }}
                disabled={selectionList.length >= MAX_SELECTION}
            >
                添加选项
            </Button>
        </div>
    </div>
}
