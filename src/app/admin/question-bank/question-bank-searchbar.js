"use client";
import React from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Link,
} from "@nextui-org/react";
import {useRouter, useSearchParams} from "next/navigation";
import {set} from "zod";

export default function QuestionBankSearchbar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [questionBankStatus, setQuestionBankStatus] = React.useState("全部");
    const [kw, setKw] = React.useState("");


    return (
        <>
            <div>
                <div className="flex justify-between">
                    <div className="mr-8">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    className="capitalize h-12"
                                >
                                    题库状态 : {questionBankStatus}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="QuestionBank"
                                variant="flat"
                                selectionMode="single"
                                disallowEmptySelection
                                selectedKeys={questionBankStatus}
                                onSelectionChange={setQuestionBankStatus}
                            >
                                <DropdownItem key="全部" value="全部">
                                    全部
                                </DropdownItem>
                                <DropdownItem key="已发布" value="已发布">
                                    已发布
                                </DropdownItem>
                                <DropdownItem key="未发布" value="未发布">
                                    未发布
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mr-3.5">
                        <Input type="text" label="题库名称" size="sm" value={kw} onChange={
                            (e) => {
                                setKw(e.target.value)
                            }
                        }/>
                    </div>

                    <div className="flex">
                        <Button
                            color="primary"
                            className="capitalize h-12 mr-2"
                            onClick={() => {
                                const sp = new URLSearchParams(searchParams);
                                sp.set('status', questionBankStatus.currentKey)
                                sp.set('kw', kw);
                                router.push("/admin/question-bank?" + sp.toString())
                                router.refresh();
                            }}
                        >
                            搜索
                        </Button>
                        <Button
                            as={Link}
                            href={"/admin/question-bank/add"}
                            color="primary"
                            className="capitalize h-12"
                        >
                            新增
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
