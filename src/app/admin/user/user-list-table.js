"use client"

import React from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {
    Button,
    Chip, Image, Link,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow, Tooltip,
} from "@nextui-org/react";
import {parseDateTime, parseSize} from "@/utils/string";
import {IconEdit} from "@/components/icons/IconEdit";
import {IconDelete} from "@/components/icons/IconDelete";
import DeleteConfirm from "@/app/admin/user/[userId]/edit/delete-button";

export default function UserListTable({fileList, pages}) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const columns = [
        {
            name: "用户ID",
            uid: "userId",
        },
        {
            name: "用户名",
            uid: "username",
        },
        {
            name: "姓名",
            uid: "name",
        },
        {
            name: "学工号",
            uid: "employeeId",
        },
        {
            name: "角色",
            uid: "role",
        },
        {
            name: "操作",
            uid: "action",
        }
    ];

    const renderChip = (role) => {
        switch (role) {
            case "student":
                return (
                    <Chip
                        color={"success"}
                        variant={"flat"}
                    > 学生 </Chip>
                )
            case "teacher":
                return (
                    <Chip
                        color={"warning"}
                        variant={"flat"}
                    > 教师 </Chip>
                )
            default:
                return null;
        }
    }


    const renderCell = React.useCallback((item, columnKey) => {

        switch (columnKey) {
            case "userId":
                return (
                    <div className={"flex justify-center"}>
                        <span>{item.userId}</span>
                    </div>
                )
            case "username":
                return (
                    <div className={"flex justify-start items-center gap-2"}>
                        <Image
                            src={item.avatar}
                            width={30}
                            height={30}
                            alt={"avatar"}
                            className={"rounded-full"}
                        />
                        <span>{item.username}</span>
                    </div>
                )
            case "name":
                return (
                    <div className={"flex justify-center"}>
                        <span>{item.name}</span>
                    </div>
                )
            case "employeeId":
                return (
                    <div className={"flex justify-center"}>
                        <span>{item.employeeId}</span>
                    </div>
                )
            case "role":
                return (
                    <div className={"flex justify-center"}>
                        <span>{renderChip(item.role)}</span>
                    </div>
                )
            case "action":
                return (
                    <div className={"flex justify-center items-center gap-3"}>
                        <div
                            className={"active:opacity-50 cursor-pointer"}
                            onClick={() => {
                                router.push(`/admin/user/${item.userId}/edit`)
                                router.refresh();
                            }}
                        >
                            <IconEdit size={20} fill={"#000"}/>
                        </div>
                        <div
                            className={"text-red-500 active:opacity-50 text-[20px] cursor-pointer"}
                            onClick={() => {
                            }}
                        >
                            <DeleteConfirm userId={item.userId}>
                                <IconDelete/>
                            </DeleteConfirm>
                        </div>
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
                                key={item.userId}
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
                        router.push("/admin/user?" + sp.toString())
                        router.refresh();
                    }}
                />
            </div>
        </div>
    )
}
