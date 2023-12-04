import NavBarComp from "@/components/layout/navbar";
import React from "react";
import {getLogList} from "@/service/log";
import LogListTable from "@/app/admin/log/log-list-table";
import LogListSearchBar from "@/app/admin/log/log-list-searchbar";
import {isAdmin} from "@/utils/auth";
import {notFound} from "next/navigation";

export default async function LogsPage({searchParams}) {
    if (!await isAdmin()) {
        return notFound();
    }
    let {page, kw, type} = searchParams
    page = Number(page) || 1;
    type = type || null;

    const pagesDefault = {
        page: page,
        pageSize: 15,
    }
    const logData = await getLogList({
        kw: kw,
        type: type,
        userId: null,
        page: pagesDefault.page,
        pageSize: pagesDefault.pageSize
    });

    const total = logData.count;
    const logList = logData.logList;

    const pages = {
        totalPages: Math.ceil(total / pagesDefault.pageSize) || 1,
        current: 1,
    }

    return (
        <>
            <NavBarComp route={"/admin/log"}/>
            <div className={""}>
                <div className={"flex justify-center"}>
                    <div className={"w-[1024px] p-5 mt-5"}>
                        <div className={"flex flex-row w-full bg-white rounded-lg shadow-xl p-7"}>
                            <LogListSearchBar/>
                        </div>
                    </div>
                </div>
                <div className={"w-full"}>
                    <LogListTable fileList={logList} pages={pages}/>
                </div>
            </div>
        </>
    )
}
