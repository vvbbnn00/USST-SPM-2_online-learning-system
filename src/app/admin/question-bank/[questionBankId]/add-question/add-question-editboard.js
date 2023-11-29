"use client";
import React, {useEffect} from "react";
import {Button, Checkbox, CheckboxGroup, Input, Radio, RadioGroup, Select, SelectItem} from "@nextui-org/react";


export default function QuestionEditBoard({question_bank_id}) {
    const MAX_SELECTION = 10;
    const [questionType, setQuestionType] = React.useState();
    const [singleChoice, setSingleChoice] = React.useState();
    const [selectionList, setSelectionList] = React.useState([]);
    const [multipleChoice, setMultipleChoice] = React.useState();
    const [multipleChoiceList, setMultipleChoiceList] = React.useState([]);
    const [fillBlankList, setFillBlankList] = React.useState([]);

    // useEffect(() => {
    //     console.log(questionType)
    // }, [questionType]);

    return (
        <div className={"flex justify-center w-full p-10 pt-2.5"}>
            <div className={"w-full"}>
                <div className={"pt-1 pb-10"}>
                    <div className={"flex bg-white p-5 rounded-xl shadow-xl"}>

                        {/*editFrame*/}
                        <div className={"flex flex-col justify-start w-1/4"}>
                            <div className={"flex justify-center p-5"}>
                                <span className={"text-gray-750 font-bold text-xl"}>题目详情</span>
                            </div>
                            <div className={"flex justify-center w-full pb-5"}>
                                <div className={"w-[600px] flex flex-col gap-5"}>
                                    <Input
                                        label={"题目描述"}
                                        isRequired
                                        size={"lg"}
                                        type={"text"}
                                        name={"question_content"}
                                        minLength={1}
                                        maxLength={255}
                                        defaultValue={""}
                                    />
                                    <Select
                                        label="题目类型"
                                        size={"lg"}
                                        selectionMode={"single"}
                                        isRequired
                                        name={"question_option"}
                                        selectedKeys={questionType}
                                        onSelectionChange={setQuestionType}
                                    >
                                        <SelectItem value={"单选题"} key={"单选题"}>
                                            {"单选题"}
                                        </SelectItem>
                                        <SelectItem value={"多选题"} key={"多选题"}>
                                            {"多选题"}
                                        </SelectItem>
                                        <SelectItem value={"填空题"} key={"填空题"}>
                                            {"填空题"}
                                        </SelectItem>
                                        <SelectItem value={"简答题"} key={"简答题"}>
                                            {"简答题"}
                                        </SelectItem>
                                    </Select>
                                    <input name={"is_subjective"} type={"hidden"} value={(questionType === "单选题" || questionType === "多选题") ? 1 : 0}/>
                                    <p className="text-small text-default-500">Selected: {questionType}</p>
                                </div>
                            </div>

                            <hr/>

                            <div className={"flex justify-start p-5"}>
                                <span className={"text-gray-750 font-bold text-xl"}>答案设置</span>
                            </div>
                            {
                                (questionType?.currentKey === "单选题") &&
                                <div className={"flex justify-center w-full pb-5"}>
                                    <div className={"w-[800px] flex flex-col gap-5"}>
                                        <RadioGroup
                                            value={singleChoice}
                                            onValueChange={setSingleChoice}
                                        >
                                            {selectionList.map((item, index) => (
                                                <div className={"flex"} key={index}>
                                                    <Radio value={item.value}></Radio>
                                                    <Input
                                                        label={`选项${item.label}`}
                                                        className={"mr-2.5"}
                                                        isRequired
                                                        size={"sm"}
                                                        type={"text"}
                                                        minLength={1}
                                                        maxLength={255}
                                                        defaultValue={""}
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
                                                        删除选项
                                                    </Button>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                        <Button
                                            auto
                                            label={"添加选项"}
                                            size={"sm"}
                                            onClick={() => {
                                                if (selectionList.length < MAX_SELECTION) {
                                                    setSelectionList([...selectionList, {
                                                        label: selectionList.length + 1,
                                                        value: selectionList.length + 1
                                                    }])
                                                }
                                            }}
                                        >
                                            添加选项
                                        </Button>
                                    </div>
                                </div>

                            }
                            {
                                (questionType?.currentKey === "多选题") &&
                                <div className={"flex justify-center w-full pb-5"}>
                                    <div className={"w-[800px] flex flex-col gap-5"}>
                                        <CheckboxGroup
                                            color="warning"
                                            value={multipleChoice}
                                            onValueChange={setMultipleChoice}
                                        >
                                            {multipleChoiceList.map((item, index) => (
                                                <div className={"flex"} key={index}>
                                                    <Checkbox value={item.value}></Checkbox>
                                                    <Input
                                                        label={`选项${item.label}`}
                                                        className={"mr-2.5"}
                                                        isRequired
                                                        size={"sm"}
                                                        type={"text"}
                                                        minLength={1}
                                                        maxLength={255}
                                                        defaultValue={""}
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
                                                        删除选项
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
                            {
                                (questionType?.currentKey === "填空题") &&
                                <div className={"flex justify-center w-full pb-5"}>
                                    <div className={"w-[800px] flex flex-col gap-5"}>
                                        {fillBlankList.map((item, index) => (
                                            <div className={"flex"} key={index}>
                                                <Input
                                                    label={"答案"}
                                                    className={"mr-2.5"}
                                                    isRequired
                                                    size={"lg"}
                                                    type={"text"}
                                                    name={`question_content_${index}`}
                                                    minLength={1}
                                                    maxLength={255}
                                                    defaultValue={""}
                                                />
                                                <Button
                                                    auto
                                                    label={"删除答案"}
                                                    size={"sm"}
                                                    onClick={() => {
                                                        if (fillBlankList.length > 0) {
                                                            setFillBlankList(fillBlankList.filter((_, i) => i !== index));
                                                        }
                                                    }}
                                                >
                                                    删除答案
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            auto
                                            label={"添加答案"}
                                            size={"sm"}
                                            onClick={() => {
                                                if (fillBlankList.length < MAX_SELECTION) {
                                                    setFillBlankList([...fillBlankList, {
                                                        label: fillBlankList.length + 1,
                                                        value: fillBlankList.length + 1
                                                    }])
                                                }
                                            }}
                                        >
                                            添加答案
                                        </Button>
                                    </div>
                                </div>
                            }

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}