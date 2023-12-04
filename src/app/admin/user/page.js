import NavBarComp from "@/components/layout/navbar";
import React from "react";
import {getUserList} from "@/service/user";
import UserListSearchbar from "@/app/admin/user/user-list-searchbar";
import UserListTable from "@/app/admin/user/user-list-table";
import {notFound} from "next/navigation";
import {isAdmin} from "@/utils/auth";

export default async function UsersPage({searchParams}) {
    if (!await isAdmin()) {
        return notFound();
    }
    let {page, kw, role} = searchParams
    page = Number(page) || 1;
    role = role || null;

    const pagesDefault = {
        page: page,
        pageSize: 15,
    }
    const userData = await getUserList({
        kw: kw,
        role: role,
        page: pagesDefault.page,
        pageSize: pagesDefault.pageSize
    });

    const total = userData.count;
    const userList = userData.userList;

    const pages = {
        totalPages: Math.ceil(total / pagesDefault.pageSize) || 1,
        current: 1,
    }

    return (
        <>
            <NavBarComp route={"/admin/user"}/>
            <div className={""}>
                <div className={"flex justify-center"}>
                    <div className={"w-[1024px] p-5 mt-5"}>
                        <div className={"flex flex-row w-full bg-white rounded-lg shadow-xl p-7"}>
                            <UserListSearchbar/>
                        </div>
                    </div>
                </div>
                <div className={"w-full"}>
                    <UserListTable fileList={userList} pages={pages}/>
                </div>
            </div>
        </>
    )
}
