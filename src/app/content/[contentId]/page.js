"use server"
import React from "react";
import NavBarComp from "@/component/layout/navbar";
import {Button, Image, Link, Tooltip, User} from "@nextui-org/react";
import FileIconRounded from "@/component/layout/file-icon-rounded";
import {IconEdit} from "@/component/icons/IconEdit";
import FilePreview from "@/app/content/[contentId]/file-preview";

export default async function ContentsDetail({searchParams, params}) {
    const contentId = params.contentId;

    return <>
        <NavBarComp route={"/content"}/>

        <div className={"flex justify-center"}>
            <div className={"w-[1024px]"}>
                <div className={"pt-10 pb-10"}>

                    <div className={"flex bg-white p-5 rounded-xl shadow-xl"}>
                        <div className={"flex"}>
                            <Button
                                as={Link}
                                href={`/content`}
                                variant={"faded"}
                            >
                                &lt; 返回
                            </Button>
                        </div>

                        <div className={"flex flex-1 justify-center"}>
                            <Tooltip content={"第一章 项目初始"}>
                                <div className={"flex gap-2.5 items-center"}>
                                    <FileIconRounded type={"pdf"}/>
                                    <span className={"text-gray-950 font-bold text-xl"}>教学材料1</span>
                                </div>
                            </Tooltip>
                        </div>

                        <div className={"flex"}>
                            <div className={"flex gap-2.5 items-center justify-end"}>
                                <Button
                                    as={Link}
                                    href={`/content/${contentId}/edit`}
                                    color={"default"}
                                    startContent={<IconEdit fill={"#737373"}/>}
                                >
                                    编辑
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={"flex bg-white p-5 rounded-xl shadow-xl mt-5"}>
                        <FilePreview file={{
                            name: "教学材料1",
                            url: "/course-cover.png",
                            previewUrl: "http://localhost:8012/onlinePreview?url=aHR0cDovLzE5Mi4xNjguMzEuMTA2OjMwMDAvYXBpL3Rlc3QvMS5kb2N4&sign=81096171229a71798f3332708d7db7928a69e44845b3e0533412a06778993962&exp=9999999999999",
                            type: "png"
                        }} />
                    </div>

                </div>
            </div>
        </div>
    </>
}
