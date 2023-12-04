"use client";
import React from "react";
import {
    Button,
    Input,
    Select, SelectItem,
} from "@nextui-org/react";
import {useRouter, useSearchParams} from "next/navigation";
import {IconSearch} from "@/components/icons/IconSearch";

export default function UserListSearchbar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [kw, setKw] = React.useState(searchParams.get('kw') || "");


    return (
        <>
            <div className={"flex justify-between items-center w-full"}>
                <div className="flex justify-between">
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mr-3.5">
                        <Select
                            size="sm"
                            placeholder="请选择用户角色"
                            className="w-72"
                            onChange={
                                (e) => {
                                    const sp = new URLSearchParams(searchParams);
                                    if (e.target.value) {
                                        sp.set('role', e.target.value);
                                        router.push("/admin/user?" + sp.toString())
                                    } else {
                                        sp.delete('role');
                                        router.push("/admin/user?" + sp.toString())
                                    }
                                    router.refresh();
                                }
                            }>
                            <SelectItem value={"student"} key={"student"}>学生</SelectItem>
                            <SelectItem value={"teacher"} key={"teacher"}>教师</SelectItem>
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
                                router.push("/admin/user?" + sp.toString())
                                router.refresh();
                            }}
                        >
                            搜索
                        </Button>
                    </div>
                </div>
                <div className={"flex justify-end"}>
                    <Button
                        className="capitalize h-12 mr-2"
                        onClick={() => {
                            router.push("/admin/user/add")
                        }}
                    >
                        创建用户
                    </Button>
                </div>
            </div>
        </>
    )
}
