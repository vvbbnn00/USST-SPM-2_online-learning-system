"use server"
import React from "react";
import NavBarComp from "@/component/layout/navbar";
import {Button, Image, Link, Tooltip, User} from "@nextui-org/react";
import ContentList from "@/app/content/content-list";
import {isTeacher} from "@/utils/auth";
import {IconAdd} from "@/component/icons/IconAdd";
import {getContentList} from "@/service/content";

export default async function Contents() {
    const contentList = await getContentList();

    return <>
        <NavBarComp route={"/content"}/>

        <div className={"flex justify-center"}>
            <div className={"w-[1024px]"}>
                <div className={"bg-white rounded p-5 mt-5 m-2.5 flex flex-row items-center justify-between"}>
                    <div className={"text-gray-600 border-l-5 pl-2.5 "}>
                        一共有 <b>{contentList.length}</b> 个教学材料。
                    </div>
                    {await isTeacher() && <div>
                        <Button
                            as={Link}
                            href={"/content/add"}
                            size={"sm"}
                            variant={"bordered"}
                            startContent={<IconAdd size={16}/>}
                        >
                            新增
                        </Button>
                    </div>}
                </div>

                <div className={"pt-2.5 pb-10"}>
                    <ContentList contentList={contentList}/>
                </div>
            </div>
        </div>
    </>
}
