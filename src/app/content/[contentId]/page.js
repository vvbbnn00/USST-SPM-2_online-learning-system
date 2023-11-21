"use server"
import React from "react";
import NavBarComp from "@/component/layout/navbar";
import {Button, Link, Tooltip} from "@nextui-org/react";
import FileIconRounded from "@/component/layout/file-icon-rounded";
import {IconEdit} from "@/component/icons/IconEdit";
import FilePreview from "@/component/layout/preview/file-preview";

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
                            name: "教学材料1.zip",
                            // audio
                            // url: "http://10.16.2.6:18080/file/download/1700592671/63d44e12f11cb925286a94985f51c59a/d41d8cd98f00b204e9800998ecf8427e?n=DPCKhoC7VfAosaZ8ZQPpNXhO9oC1DVUU&t=1701592685&s=a05c905423b83eb9329e3d77d0bdff8321bb2cac&filename=test.flac",
                            // video
                            url: "http://10.16.2.6:18080/file/download/1700590492/8a7b5eb30fbc763dac7370bc5886c06e/d41d8cd98f00b204e9800998ecf8427e?n=uQGrtB4vaWcgKgCHwD0CD3en27fErciS&t=1701590524&s=5d393fd2fd741a5f4cf791d03f5b89f747f35b70&filename=test.mp4",
                            // url: "/course-cover.png",
                            previewUrl: "http://192.168.31.106:8012/onlinePreview?url=aHR0cDovLzE5Mi4xNjguMzEuMTA2OjMwMDAvYXBpL3Rlc3QvMS5kb2N4&sign=81096171229a71798f3332708d7db7928a69e44845b3e0533412a06778993962&exp=9999999999999",
                            type: "doc",
                            size: 100,
                            canDownload: true,
                        }} />
                    </div>

                </div>
            </div>
        </div>
    </>
}
