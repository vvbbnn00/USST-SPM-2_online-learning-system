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
import {IconSearch} from "@/components/icons/IconSearch";

export default function FileListSearchbar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [kw, setKw] = React.useState(searchParams.get('kw') || "");


    return (
        <>
            <div>
                <div className="flex justify-between">
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mr-3.5">
                        <Input
                            type="text"
                            placeholder={"输入文件名以搜索"}
                            size="sm"
                            value={kw}
                            onChange={
                                (e) => {
                                    setKw(e.target.value)
                                }
                            }
                            startContent={<IconSearch />}
                        />
                    </div>

                    <div className="flex">
                        <Button
                            color="primary"
                            className="capitalize h-12 mr-2"
                            onClick={() => {
                                const sp = new URLSearchParams(searchParams);
                                sp.set('kw', kw);
                                router.push("/admin/file?" + sp.toString())
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
