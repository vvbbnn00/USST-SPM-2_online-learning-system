"use client"

import React from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {
    Button, Chip,
    Link,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import {IconEdit} from "@/components/icons/IconEdit";

export default function QuestionBankTable({questionBankList, pages}) {
    const searchParams = useSearchParams();
    const router = useRouter();

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

    const changeStatus = (status) => {
        const sp = new URLSearchParams(searchParams);
        sp.set('status', status);
        sp.set('page', 1)

        location.href = `/questionBank?${sp.toString()}`;
    }

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
                                color={"primary"}
                                as={Link}
                                startContent={<IconEdit/>}
                                size={"md"}
                                onClick={() => {
                                    router.push(`/admin/question-bank/${item.question_bank_id}/edit`)
                                    router.refresh();
                                }}
                            >
                                查看详情 & 编辑
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