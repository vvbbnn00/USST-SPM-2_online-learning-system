"use server"
import React from "react";
import NavBarComp from "@/components/layout/navbar";
import {Button, Link, Tooltip} from "@nextui-org/react";
import ContentForm from "@/app/content/[contentId]/edit/content-form";
import {getContentDetail} from "@/service/content";
import {notFound} from "next/navigation";

export default async function ContentsDetail({searchParams, params}) {
    const contentId = params.contentId;
    const contentDetail = await getContentDetail({contentId});
    if (contentDetail == null) {
        return notFound();
    }

    return <>
        <NavBarComp route={"/content"}/>

        <div className={"flex justify-center"}>
            <div className={"w-[1024px]"}>
                <div className={"pt-10 pb-10"}>

                    <div className={"flex bg-white p-5 rounded-xl shadow-xl"}>
                        <div className={"flex absolute"}>
                            <Button
                                as={Link}
                                href={`/content/${contentId}`}
                                variant={"faded"}
                            >
                                &lt; 返回
                            </Button>
                        </div>

                        <div className={"flex flex-1 justify-center p-1.5"}>
                            <Tooltip content={contentDetail.chapter}>
                                <div className={"flex gap-2.5 items-center"}>
                                    <span className={"text-gray-950 font-bold text-xl"}>编辑 - {contentDetail.contentName}</span>
                                </div>
                            </Tooltip>
                        </div>

                    </div>

                    <div className={"flex bg-white p-10 rounded-xl shadow-xl mt-5 flex-col gap-5 w-full"}>
                        <div className={"w-full justify-center flex"}>
                            <ContentForm content={contentDetail}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}
