"use client";
import {
    Button,
    Chip,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Progress,
    Tooltip, User
} from "@nextui-org/react";
import FileIconRounded from "@/components/layout/file-icon-rounded";
import React, {useState} from "react";
import useSWR from "swr";

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
    const [isOpen, setOpen] = useState(false);
    const {
        data,
        error,
        isLoading
    } = useSWR(
        isOpen ? `/api/content/${item.contentId}/record` : null,
        (url) => fetch(url).then(res => res.json())
    );

    return <div
        className={"flex items-center gap-5 hover:bg-gray-100 w-full p-2.5 pl-5 pr-5 rounded-xl"}>

        <Modal isOpen={isOpen} isDismissable={false} hideCloseButton={true}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">完成情况</ModalHeader>
                        <ModalBody>
                            <div className={"flex flex-col gap-2.5"}>
                                {isLoading && <div>加载中...</div>}
                                {error && <div>加载失败</div>}
                                {data && <div className={"flex flex-col gap-2.5"}>
                                    {data?.data?.list?.map((item, index) => {
                                        return <div key={index.toString()} className={"flex flex-col gap-1"}>
                                            <div
                                                className={"flex gap-2.5 items-center justify-between hover:bg-gray-100 w-full p-2.5 pl-5 pr-5 rounded-xl"}>
                                                <User
                                                    name={item?.user?.name}
                                                    description={`${item?.user?.username} #${item?.user?.userId}`}
                                                    avatarProps={{
                                                        src: item?.user?.avatar,
                                                    }}
                                                />
                                                <Chip
                                                    color={item?.status === "finished" ? "success" : "warning"}
                                                    variant={"flat"}>
                                                    {item?.status === "finished" ? "已完成" : "未完成"}
                                                </Chip>
                                            </div>
                                        </div>
                                    })}
                                </div>}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={
                                () => {
                                    setOpen(false);
                                }
                            }>
                                关闭
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>

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
                    <div className={"cursor-pointer"} onClick={() => {
                        setOpen(true)
                    }}>
                        <Progress
                            aria-label="完成情况"
                            size="md"
                            minValue={0}
                            value={item.progress.finished}
                            maxValue={item.progress.total}
                            color="success"
                        />
                    </div>
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
