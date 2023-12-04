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
    TableRow, Tooltip, useDisclosure,
} from "@nextui-org/react";
import {IconEdit} from "@/components/icons/IconEdit";
import {parseSize} from "@/utils/string";
import FileIconRounded from "@/components/layout/file-icon-rounded";
import {IconDownload} from "@/components/icons/IconDownload";

export default function FileListTable({fileList, pages}) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const columns = [
        {
            name: "文件ID",
            uid: "fileId",
        },
        {
            name: "文件名称",
            uid: "fileName",
        },
        {
            name: "文件类型",
            uid: "fileType",
        },
        {
            name: "文件大小",
            uid: "fileSize",
        },
        {
            name: "操作",
            uid: "operation",
        }
    ];


    const renderCell = React.useCallback((item, columnKey) => {

        switch (columnKey) {
            case "fileId":
                return (
                    <div className={"flex justify-center"}>
                        <span>{item.fileId}</span>
                    </div>
                )
            case "fileName":
                return (
                    <Tooltip content={item.fileName}>
                        <div className={"flex justify-start gap-3 items-center"}>
                            <FileIconRounded type={item.fileType} size={20}/>
                            <span className={"truncate"}>{item.fileName}</span>
                        </div>
                    </Tooltip>
                )
            case "fileType":
                return (
                    <div className={"flex justify-center"}>
                        <Chip>
                            {item.fileType}
                        </Chip>
                    </div>
                )
            case "fileSize":
                return (
                    <div className={"flex justify-center"}>
                        <span>{parseSize(item.fileSize)}</span>
                    </div>
                )
            case "operation":
                return (
                    <div className={"flex justify-center"}>
                        <Link
                            className={"active:opacity-50"}
                            href={`/api/upload/${item.fileId}/download`}
                        >
                            <IconDownload size={20} fill={"#000000"} className={"cursor-pointer"} />
                        </Link>
                    </div>
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
                        router.push("/admin/file?" + sp.toString())
                        router.refresh();
                    }}
                />
            </div>
        </div>
    )
}
