"use server"
import React from "react";
import NavBarComp from "@/components/layout/navbar";
import {Button, Link, Tooltip} from "@nextui-org/react";
import FileIconRounded from "@/components/layout/file-icon-rounded";
import {IconEdit} from "@/components/icons/IconEdit";
import FilePreview from "@/components/layout/preview/file-preview";
import {parseSize} from "@/utils/string";
import {getContentDetail} from "@/service/content";
import {notFound} from "next/navigation";
import {isTeacher} from "@/utils/auth";

export default async function ContentsDetail({searchParams, params}) {
    const contentId = params.contentId;

    const contentDetail = await getContentDetail({contentId});
    if (contentDetail == null) {
        return notFound();
    }

    const file = {
        name: contentDetail.contentName,
        url: contentDetail.downloadUrl,
        previewUrl: contentDetail.previewUrl,
        type: contentDetail.contentType,
        size: contentDetail.contentFile.fileSize,
        canDownload: contentDetail.canDownload,
    }


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
                            <Tooltip content={contentDetail.chapter}>
                                <div className={"flex gap-2.5 items-center"}>
                                    <FileIconRounded type={contentDetail.contentType}/>
                                    <span
                                        className={"text-gray-950 font-bold text-xl"}>{contentDetail.contentName}</span>
                                </div>
                            </Tooltip>
                        </div>

                        <div className={"flex"}>
                            <div className={"flex gap-2.5 items-center justify-end"}>
                                <Button
                                    as={Link}
                                    href={`/content/${contentDetail.contentId}/edit`}
                                    color={"default"}
                                    startContent={<IconEdit fill={"#737373"}/>}
                                >
                                    编辑
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={"flex bg-white p-5 rounded-xl shadow-xl mt-5 flex-col gap-5 w-full"}>
                        <FilePreview file={file}/>
                        <div className={"w-full justify-center flex"}>
                            <div className={"justify-center flex pb-10 flex-col gap-1.5 w-full"}>
                                <div className={"text-gray-500 text-sm text-center"}>
                                    文件大小：{parseSize(file.size)}
                                </div>
                                <div className={"w-full flex justify-center"}>
                                    <Button
                                        color={"primary"}
                                        size={"lg"}
                                        className={"w-1/4"}
                                        isDisabled={!file.canDownload && !await isTeacher()}
                                        variant={"solid"}
                                        as={Link}
                                        href={file.url}
                                    >
                                        下载
                                    </Button>
                                </div>
                                {(await isTeacher() && !file.canDownload) &&
                                    <div className={"text-red-500 text-sm text-center"}>
                                        该教学材料仅允许查看，学生无法下载
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}
