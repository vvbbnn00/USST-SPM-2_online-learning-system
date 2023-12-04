"use client";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link} from "@nextui-org/react";
import React from "react";


export default function QuestionHeaderBar({questionBankDetail, onCreateQuestion}) {
    return (
        <div className={"flex justify-center w-full"}>
            <div className={"w-full"}>
                <div>

                    <div className={"flex backdrop-blur bg-white bg-opacity-70 p-5 shadow-xl"}>
                        <div className={"w-1/5"}>
                            <Button
                                as={Link}
                                href={`/admin/question-bank/${questionBankDetail.question_bank_id}/edit`}
                                variant={"faded"}
                            >
                                &lt; 返回
                            </Button>
                        </div>

                        <div className={"justify-center p-1.5 w-3/5 flex"}>
                            <div className={"flex gap-2.5 items-center ml-14"}>
                                <span className={"text-gray-950 font-bold text-xl"}>题目详情&修改 - {questionBankDetail.title}</span>
                            </div>
                        </div>

                        <div className={"w-1/5 flex justify-end"}>
                            <Button
                                color={"primary"}
                                onClick={onCreateQuestion}
                            >
                                新建题目
                            </Button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )

}
