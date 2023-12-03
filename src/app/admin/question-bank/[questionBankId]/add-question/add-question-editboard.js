"use client";
import React, {useEffect} from "react";
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Input,
    Radio,
    RadioGroup,
    Select,
    SelectItem,
    Table, TableBody, TableCell, TableColumn,
    TableHeader, TableRow
} from "@nextui-org/react";
import {useFormState, useFormStatus} from "react-dom";
import {formCreateQuestionBank} from "@/components/layout/content-form/actions";


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

export default function QuestionEditBoard({question_bank_id}) {
    const MAX_SELECTION = 10;
    const [questionType, setQuestionType] = React.useState();
    const [singleChoice, setSingleChoice] = React.useState();
    const [selectionList, setSelectionList] = React.useState([]);
    const [multipleChoice, setMultipleChoice] = React.useState();
    const [multipleChoiceList, setMultipleChoiceList] = React.useState([]);
    const [fillBlankList, setFillBlankList] = React.useState([]);

    const [state, formAction] = useFormState({});

    useEffect(() => {
        if (state?.code === 200) {
            location.href = `/admin/question-bank`;
        }
    }, [state]);

    const question = [
        {
            question_content: "单选题1",
            question_option: {
                "A": "A1",
                "B": "B1",
                "C": "C1",
                "D": "D1"
            },
            is_subjective: 1,
            question_bank_id: 1
        },
        {
            question_content: "多选题1",
            question_option: {
                "A": "A2",
                "B": "B2",
                "C": "C2",
                "D": "D2"
            },
            is_subjective: 1,
            question_bank_id: 1
        },
        {
            question_content: "填空题1",
            question_option: {
                answer: "answer"
            },
            is_subjective: 0,
            question_bank_id: 1
        },
        {
            question_content: "简答题1",
            question_option: {
                answer: "answer1"
            },
            is_subjective: 0,
            question_bank_id: 1
        }
    ]


    // useEffect(() => {
    //     console.log(questionType)
    // }, [questionType]);

    return (
        <div className={"flex justify-center w-full p-10 pt-2.5"}>
            <div className={"w-full"}>
                <div className={"pt-1 pb-10"}>
                    <div className={"flex bg-white p-5 rounded-xl shadow-xl"}>

                        {/*editFrame*/}
                        <div className={"flex flex-col justify-start w-1/2"}>
                            <div className={"flex justify-center p-5"}>
                                <span className={"text-gray-750 font-bold text-xl"}>题目详情</span>
                            </div>

                            <form action={formAction}>

                                {
                                    (state?.code && state?.code !== 200) &&
                                    <div
                                        className={"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"}
                                        role="alert">
                                        <strong className={"font-bold"}>
                                            创建失败
                                        </strong>
                                        <span className={"block sm:inline"}>{state?.message}</span>
                                    </div>
                                }

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
                                        <input name={"is_subjective"} type={"hidden"}
                                               value={(questionType === "单选题" || questionType === "多选题") ? 1 : 0}/>
                                        <p className="text-small text-default-500">Selected: {questionType}</p>
                                    </div>
                                </div>

                                <hr/>

                                <div className={"flex justify-center p-5"}>
                                    <span className={"text-gray-750 font-bold text-xl"}>答案设置&注释</span>
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
                                                        <Radio
                                                            value={item.value}
                                                            name={"question_option"}
                                                        ></Radio>
                                                        <Input
                                                            label={`选项${item.label}`}
                                                            className={"mr-2.5"}
                                                            name={`question_option_${index}`}
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
                                            <p className="text-default-500 text-small">Selected: {singleChoice}</p>
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
                                                        <Checkbox
                                                            value={item.value}
                                                            name={"question_option"}
                                                        ></Checkbox>
                                                        <Input
                                                            label={`选项${item.label}`}
                                                            className={"mr-2.5"}
                                                            name={`question_option_${index}`}
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
                                                        name={`question_option_${index}`}
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
                                {
                                    (questionType?.currentKey === "简答题") &&
                                    <div className={"flex justify-center w-full pb-5"}>
                                        <div className={"w-[800px] flex flex-col gap-5"}>
                                            <Input
                                                label={"注释"}
                                                isRequired
                                                name={"question_option"}
                                                size={"lg"}
                                                type={"text"}
                                                name={"question_comment"}
                                                minLength={1}
                                                maxLength={255}
                                                defaultValue={""}
                                            />
                                        </div>
                                    </div>
                                }
                            </form>

                            <div className={"flex justify-center w-full"}>
                                <Submit/>
                            </div>

                        </div>

                        {/*previewFrame*/}
                        <div className={"flex flex-col justify-start w-1/2"}>
                            <div className={"flex justify-center p-5"}>
                                <span className={"text-gray-750 font-bold text-xl"}>题目预览</span>
                            </div>
                            <Table
                                hideHeader={true}
                                selectionMode={"single"}
                                className={"w-full pl-5 pr-5"}
                            >
                                <TableHeader>
                                    <TableColumn>题目预览</TableColumn>
                                </TableHeader>.
                                <TableBody>
                                    {question.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <div className={"font-bold text-medium pb-2"}>
                                                    {index + 1}. {item.question_content}
                                                </div>
                                                {/*这里需要获取value 下面这个是用的之前的*/}
                                                {
                                                    (item.is_subjective === 1) &&
                                                    <RadioGroup
                                                        value={singleChoice}
                                                        isDisabled
                                                    >
                                                        {Object.keys(item.question_option).map((key, index) => (
                                                            <div className={"flex"} key={index}>
                                                                <Radio
                                                                    value={item.question_option[key]}
                                                                    name={"question_option"}
                                                                ></Radio>
                                                                <div className={"text-sm"}>
                                                                    {item.question_option[key]}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </RadioGroup>
                                                }
                                                {
                                                    (item.is_subjective === 0) &&
                                                    <Input
                                                        label={"答案/注释"}
                                                        className={"mr-2.5"}
                                                        size={"lg"}
                                                        type={"text"}
                                                        minLength={1}
                                                        maxLength={255}
                                                        defaultValue={item.question_option.answer}
                                                        disabled
                                                    />
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}