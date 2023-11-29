"use client"

import React, {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {
    Button, Chip,
    Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow, useDisclosure,
} from "@nextui-org/react";
import {IconEdit} from "@/components/icons/IconEdit";

export default function QuestionBankTable({questionBankList, pages}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [questionBankId, setQuestionBankId] = useState(null);
    const deleteQuestionBank = (qbId) => {
        setQuestionBankId(qbId);
        onOpen();
    }

    const [isLoading, setIsLoading] = useState(false);

    const columns = [
        {
            name: "题库ID",
            uid: "question_bank_id",
        },
        {
            name: "题库名称",
            uid: "title",
        },
        {
            name: "百分比",
            uid: "percentage",
        },
        {
            name: "状态",
            uid: "status",
        },
        {
            name: "操作",
            uid: "operation",
        }
    ];

    const renderChip = (status) => {
        switch (status) {
            case "已发布":
                return <Chip color="success" variant={"flat"}>
                    已发布
                </Chip>
            case "未发布":
                return <Chip color="warning" variant={"flat"}>
                    未发布
                </Chip>
            default:
                return <></>
        }
    }

    const renderCell = React.useCallback((item, columnKey) => {

        switch (columnKey) {
            case "question_bank_id":
                return (
                    <div className={"flex justify-center"}>
                        <div className={"text-medium font-bold text-gray-500"}>
                            #{item.question_bank_id}
                        </div>
                    </div>
                );
            case "title":
                return (
                    <div className={"flex justify-center"}>
                        <div className={"text-medium text-gray-500"}>
                            {item.title}
                        </div>
                    </div>
                );
            case "percentage":
                return (
                    <div className={"flex justify-center"}>
                        <div className={"text-medium text-gray-500"}>
                            {item.percentage}%
                        </div>
                    </div>
                );
            case "status":
                return (
                    <div className={"flex justify-center"}>
                        {renderChip(item.status)}
                    </div>
                );
            case "operation":
                return (
                    <div className={"flex justify-center"}>
                        <div className={"text-medium text-gray-500"}>
                            <Button
                                color={"warning"}
                                as={Link}
                                size={"md"}
                                variant={"flat"}
                                onClick={() => {
                                    router.push(`/admin/question-bank/${item.question_bank_id}/edit`)
                                    router.refresh();
                                }}
                            >
                                查看详情 & 编辑
                            </Button>

                            <Button
                                color={"danger"}
                                size={"md"}
                                className={"ml-2"}
                                variant={"flat"}
                                onClick={() => {
                                    deleteQuestionBank(item.question_bank_id)
                                }}
                            >
                                删除
                            </Button>

                        </div>
                    </div>
                );
            default:
                return null;
        }
    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <Table
                    aria-label="QuestionBank"
                    className={"w-[990px] pt-3"}
                >
                    <TableHeader>
                        {columns.map((column) => (
                            <TableColumn
                                key={column.uid}
                                className="text-center text-sm"
                            >
                                {column.name}
                            </TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody
                        emptyContent={"No question-bank bank found"}
                    >
                        {questionBankList.map((item) => (
                            <TableRow
                                key={item.question_bank_id}
                            >
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">确认</ModalHeader>
                            <ModalBody>
                                <p>
                                    确认删除吗?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button
                                    color="primary"
                                    isLoading={isLoading}
                                    onClick={
                                    () => {
                                        setIsLoading(true);
                                        fetch(`/api/question-bank/${questionBankId}`, {
                                            method: 'DELETE',
                                        }).then(r => {
                                            if (r.status === 200) {
                                                router.push("/admin/question-bank")
                                                router.refresh();
                                            }
                                        }).finally(() => {
                                            setIsLoading(false);
                                            onClose();
                                        })
                                    }

                                }>
                                    删除
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <div className={"p-5 flex justify-center"}>
                <Pagination
                    showControls
                    total={pages.totalPages}
                    initialPage={pages.current}
                    size={"lg"}
                    color="primary"
                    onChange={(page) => {
                        const sp = new URLSearchParams(searchParams);
                        sp.set('page', page);
                        router.push("/admin/question-bank?" + sp.toString())
                        router.refresh();
                    }}
                />
            </div>
        </div>
    )
}