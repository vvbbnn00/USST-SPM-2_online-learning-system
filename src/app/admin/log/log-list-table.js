"use client"

import React from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow, Tooltip,
} from "@nextui-org/react";
import {parseDateTime, parseSize} from "@/utils/string";

export default function LogListTable({fileList, pages}) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const columns = [
        {
            name: "日志ID",
            uid: "logId",
        },
        {
            name: "日志类型",
            uid: "type",
        },
        {
            name: "日志内容",
            uid: "logContent",
        },
        {
            name: "操作时间",
            uid: "time",
        },
        {
            name: "操作用户",
            uid: "user",
        }
    ];


    const renderCell = React.useCallback((item, columnKey) => {

        switch (columnKey) {
            case "logId":
                return (
                    <div className={"flex justify-center"}>
                        <span>{item.logId}</span>
                    </div>
                )
            case "type":
                return (
                    <div className={"flex justify-center"}>
                        <span>{item.type}</span>
                    </div>
                )
            case "logContent":
                return (
                    <Tooltip content={item.detail}>
                        <div className={"flex justify-start w-[400px] overflow-hidden"}>
                            <span className={"truncate"}>{item.detail}</span>
                        </div>
                    </Tooltip>
                )
            case "time":
                return (
                    <div className={"flex justify-center"}>
                        <span>{parseDateTime(item.time)}</span>
                    </div>
                )
            case "user":
                return (
                    <Tooltip content={`用户ID: ${item.userId}, 姓名: ${item.name}`}>
                        <div className={"flex justify-center"}>
                            <span>{item.username}</span>
                        </div>
                    </Tooltip>
                )
            default:
                return null;
        }
    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <Table
                    aria-label="FileList"
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
                        emptyContent={"没有数据"}
                    >
                        {fileList.map((item) => (
                            <TableRow
                                key={item.logId}
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
                        router.push("/admin/log?" + sp.toString())
                        router.refresh();
                    }}
                />
            </div>
        </div>
    )
}
