"use client";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link} from "@nextui-org/react";
import React from "react";


export default function QuestionHeaderBar({questionBankDetail}) {

    const [questionType, setQuestionType] = React.useState();

    return (
        <div className={"flex justify-center w-full p-10 pt-1 pb-0"}>
            <div className={"w-full"}>
                <div className={"pt-5 pb-5"}>

                    <div className={"flex bg-white p-5 rounded-xl shadow-xl"}>
                        <div className={"flex"}>
                            <Button
                                as={Link}
                                href={`/admin/question-bank/${questionBankDetail.question_bank_id}/edit`}
                                variant={"faded"}
                            >
                                &lt; 返回编辑
                            </Button>
                        </div>

                        <div className={"flex flex-1 justify-center p-1.5"}>
                            <div className={"flex gap-2.5 items-center ml-14"}>
                                <span className={"text-gray-950 font-bold text-xl"}>题目详情&修改 - {questionBankDetail.title}</span>
                            </div>
                        </div>

                        <div className={"flex"}>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button

                                    >
                                        + 新建题目
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="QuestionBank-Question"
                                    variant="flat"
                                    selectionMode="single"
                                    disallowEmptySelection
                                    onSelectionChange={setQuestionType}
                                >
                                    <DropdownItem key="单选题" value="单选题">
                                        单选题
                                    </DropdownItem>
                                    <DropdownItem key="多选题" value="多选题">
                                        多选题
                                    </DropdownItem>
                                    <DropdownItem key="填空题" value="填空题">
                                        填空题
                                    </DropdownItem>
                                    <DropdownItem key="问答题" value="问答题">
                                        问答题
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )

}