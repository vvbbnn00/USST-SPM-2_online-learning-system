"use client"

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure,
} from "@nextui-org/react";

export default function GradeList({gradeList, examList}) {

    const columns = [
        {
            name: "用户ID",
            uid: "user_id",
        },
        {
            name: "姓名",
            uid: "name",
        },
        {
            name: "学号",
            uid: "employee_id",
        },
        {
            name: "平时成绩",
            uid: "attendance_score",
        },
    ];
    examList.forEach((exam) => {
        columns.push({
            name: `${exam}`,
            uid: `exam_score_${exam}`, // 每个考试分数列的唯一标识符
        });
    });

    columns.push({
        name: "测试成绩",
        uid: "total_test_score",
    })
    columns.push({
        name: "总评",
        uid: "total_score",
    })

    const renderCell = React.useCallback((item, columnKey) => {
        switch (columnKey) {
            case "user_id":
                return (
                    <div className={"flex justify-center w-[50px]"}>
                        <div className={"text-medium font-bold text-gray-500"}>
                            #{item.user_id}
                        </div>
                    </div>
                );
            case "name":
                return (
                    <div className={"flex justify-center w-[80px]"}>
                        <div className={"text-medium text-gray-500"}>{item.name}</div>
                    </div>
                );
            case "employee_id":
                return (
                    <div className={"flex justify-center w-[50px]"}>
                        <div className={"text-medium text-gray-500"}>{item.employee_id}</div>
                    </div>
                );
            case "attendance_score":
                return (
                    <div className={"flex justify-center w-[60px]"}>
                        <div className={"text-medium text-gray-500"}>
                            {!isNaN(item.attendance_score) ? Number(item.attendance_score).toFixed(2) : 0}
                        </div>
                    </div>
                );
            case "total_test_score":
                return (
                    <div className={"flex justify-center w-[60px]"}>
                        <div className={"text-medium text-gray-500"}>
                            {!isNaN(item.total_test_score) ? Number(item.total_test_score).toFixed(2) : 0}
                        </div>
                    </div>
                );
            case "total_score":
                return (
                    <div className={"flex justify-center w-[60px]"}>
                        <div className={"text-medium text-gray-500"}>
                            {!isNaN(item.total_score) ? Number(item.total_score).toFixed(2) : 0}
                        </div>
                    </div>
                );
            default:
                if (columnKey.startsWith("exam_score_")) {
                    const exam = columnKey.replace("exam_score_", "");
                    return (
                        <div className={"flex justify-center w-[100px]"}>
                            <div className={"text-medium text-gray-500"}>
                                {!isNaN(item[exam]) ? Number(item[exam]).toFixed(2) : 0}/100
                            </div>
                        </div>
                    );
                }
                return null;
        }
    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <Table aria-label="gradeList" className={"w-[990px] pt-3"}>
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
                    <TableBody emptyContent={"暂无用户"}>
                        {gradeList.map((item) => (
                            <TableRow key={item.user_id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
}
