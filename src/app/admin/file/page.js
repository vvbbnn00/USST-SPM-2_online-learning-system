"use server"
import React from "react";
import {session} from "@/utils/session";
import {redirect} from "next/navigation";
import NavBarComp from "@/components/layout/navbar";
import {IconAdd} from "@/components/icons/IconAdd"
import  {IconChevronDown} from "@/components/icons/IconChevronDown";
import {IconEdit} from "@/components/icons/IconEdit";
import FileTypeDropdown from "@/components/icons/FileTypeDropdown";
import SearchBar from "@/components/icons/SearchBar";
import FileDAO from "@/dao/file";
import FileList from "./FileList";

export default async function FileListPage({searchParams}) {
    let {error} = searchParams;
    const s = await session();
    if (await s.get("user_id")) {
        redirect("/")
    }
    function formatSize(size) {
        const units = ["B", "KB", "MB", "GB"];
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }

    const fileDataArray = [] // await FileDAO.queryById({file_id: 1});
    let fileDataList = [];
    const fileCount = fileDataArray.length;
    const fileCountText = `共${fileCount}个文件`;
    for (let fileData of fileDataArray) {
        let { file_id, name, type, size, storage_id, status, create_time, create_by } = fileData;
        // 创建一个新的Date对象
        let date = new Date(create_time);
        // 使用toLocaleDateString方法格式化日期
        create_time = date.toLocaleDateString();
        let nameParts = name.split('.');
        let extension = nameParts.pop();
        name = nameParts.join('.');
        // 格式化文件大小
        size = formatSize(size);
        fileDataList.push({ file_id, name, type, size, storage_id, status, create_time, create_by});
    }
    return (
        <div>
            <NavBarComp/>

            <div className={"min-h-full"}>

                <div className="min-h-screen flex flex-col items-center justify-center">
                    <div className="w-[calc(100vw-100px)] rounded-t-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between">
                            <div className="flex space-x-5">
                                <FileTypeDropdown />
                                <SearchBar/>
                            </div>
                            <div className="flex items-center">
                                <IconAdd/>
                                <IconChevronDown/>
                                <IconEdit/>
                            </div>
                        </div>
                    </div>
                    <div className="w-[calc(100vw-101px)] shadow-lg bg-gray-100 p-6 border-gray-200 dark:border-gray-700 flex justify-between">
                        <div className="inline-flex">文件类型</div>
                        <div className="inline-flex">文件名</div>
                        <div className="inline-flex">大小</div>
                        <div className="inline-flex">创建时间</div>
                        <div className="inline-flex">上传者</div>
                        <div className="inline-flex">操作</div>
                    </div>
                    <div className="w-[calc(100vw-100px)] rounded-b-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700">
                    <FileList fileDataList={fileDataList} />
                    </div>
                    <div className="text-left mt-5">
                        {fileCountText}
                    </div>
                </div>
            </div>
        </div>
    )

}
