"use client";
import {IconFilePdf} from "@/components/icons/file/IconFilePdf";
import {Button, Chip, Link, Progress, Tooltip} from "@nextui-org/react";
import FileIconRounded from "@/components/layout/file-icon-rounded";

const renderChip = (status) => {
    switch (status) {
        case "finished":
            return <Chip color="success" variant={"flat"}>
                已完成
            </Chip>
        case "unfinished":
            return <Chip color="warning" variant={"flat"}>
                未完成
            </Chip>
        default:
            return <></>
    }
}

export function ContentItem({item}) {
    return <div
        className={"flex items-center gap-5 hover:bg-gray-100 w-full p-2.5 pl-5 pr-5 rounded-xl"}>
        <div className={"flex flex-1 items-center gap-5 justify-start"}>
            <FileIconRounded type={item.contentType}/>
            <Tooltip content={item.contentName}>
                <Link href={`/content/${item.contentId}`}>
                    <div className={"text-gray-700 text-lg line-clamp-1 break-all"}>
                        {item.contentName}
                    </div>
                </Link>
            </Tooltip>
            <div className={"select-none"}>
                {renderChip(item.status)}
            </div>
        </div>
        <div className={"flex flex-1 items-center gap-5 justify-end"}>
            <div className={"w-12"}>
                <Tooltip content={`完成人数：${item.progress.finished} / ${item.progress.total}`}>
                    <Progress
                        aria-label="完成情况"
                        size="md"
                        minValue={0}
                        value={item.progress.finished}
                        maxValue={item.progress.total}
                        color="success"
                    />
                </Tooltip>
            </div>
            <div>
                <Button
                    as={Link}
                    href={`/content/${item.contentId}`}
                    variant={"bordered"}
                    size={"sm"}
                >
                    查看
                </Button>
            </div>
        </div>
    </div>
}
