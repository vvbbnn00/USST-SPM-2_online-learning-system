"use client";
import React from "react";
import {
    Button,
    Input,
    Select, SelectItem,
} from "@nextui-org/react";
import {useRouter, useSearchParams} from "next/navigation";
import {IconSearch} from "@/components/icons/IconSearch";

export default function LogListSearchBar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [kw, setKw] = React.useState(searchParams.get('kw') || "");


    return (
        <>
            <div>
                <div className="flex justify-between">
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mr-3.5">
                        <Select
                            size="sm"
                            placeholder="请选择日志类型"
                            className="w-72"
                            onChange={
                                (e) => {
                                    const sp = new URLSearchParams(searchParams);
                                    if (e.target.value) {
                                        sp.set('type', e.target.value);
                                        router.push("/admin/log?" + sp.toString())
                                    } else {
                                        sp.delete('type');
                                        router.push("/admin/log?" + sp.toString())
                                    }
                                    router.refresh();
                                }
                            }>
                            <SelectItem value={"login"} key={"login"}>登录</SelectItem>
                            <SelectItem value={"logout"} key={"logout"}>登出</SelectItem>
                            <SelectItem value={"upload"} key={"upload"}>文件操作</SelectItem>
                            <SelectItem value={"content"} key={"content"}>课程内容</SelectItem>
                            <SelectItem value={"user"} key={"user"}>用户操作</SelectItem>
                            <SelectItem value={"question-bank"} key={"question-bank"}>题库操作</SelectItem>
                            <SelectItem value={"question"} key={"question"}>题目操作</SelectItem>
                        </Select>
                        <Input
                            type="text"
                            placeholder={"输入关键词以搜索"}
                            size="sm"
                            value={kw}
                            onChange={
                                (e) => {
                                    setKw(e.target.value)
                                }
                            }
                            startContent={<IconSearch/>}
                        />
                    </div>

                    <div className="flex">
                        <Button
                            color="primary"
                            className="capitalize h-12 mr-2"
                            onClick={() => {
                                const sp = new URLSearchParams(searchParams);
                                sp.set('kw', kw);
                                router.push("/admin/log?" + sp.toString())
                                router.refresh();
                            }}
                        >
                            搜索
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
