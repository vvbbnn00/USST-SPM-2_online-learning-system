import NavBarComp from "@/components/layout/navbar";
import React from "react";
import {getFileList} from "@/service/file";
import FileListSearchbar from "@/app/admin/file/file-list-searchbar";
import FileListTable from "@/app/admin/file/file-list-table";

export default async function FilesPage({searchParams}) {
    let {page, kw, type} = searchParams
    page = Number(page) || 1;
    type = type || null;

    const pagesDefault = {
        page: page,
        pageSize: 10,
    }
    const fileData = await getFileList({
        kw: kw,
        type: type,
        page: pagesDefault.page,
        pageSize: pagesDefault.pageSize
    });

    const total = fileData.count;
    const fileList = fileData.fileList;

    const pages = {
        totalPages: Math.ceil(total / pagesDefault.pageSize) || 1,
        current: 1,
    }

    return (
        <>
            <NavBarComp route={"/admin/file"}/>
            <div className={""}>
                <div className={"flex justify-center"}>
                    <div className={"w-[1024px] p-5 mt-5"}>
                        <div className={"flex flex-row w-full bg-white rounded-lg shadow-xl p-7"}>
                            <FileListSearchbar/>
                        </div>
                    </div>
                </div>
                <div className={"w-full"}>
                    <FileListTable fileList={fileList} pages={pages}/>
                </div>
            </div>
        </>
    )
}
