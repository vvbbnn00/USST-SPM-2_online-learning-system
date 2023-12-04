"use server"
import React from "react";
import NavBarComp from "@/components/layout/navbar";
import {Button, Link, Tooltip} from "@nextui-org/react";
import {notFound} from "next/navigation";
import {isAdmin} from "@/utils/auth";
import {getUserInfo} from "@/service/user";
import UserForm from "@/components/layout/user-form/user-form";
import DeleteConfirm from "@/app/admin/user/[userId]/edit/delete-button";



export default async function UserEditPage({searchParams, params}) {
    if (!await isAdmin()) {
        return notFound();
    }

    const userId = params.userId;
    const userDetail = await getUserInfo({userId});
    if (userDetail == null) {
        return notFound();
    }

    return <>
        <NavBarComp route={`/admin/user/${userId}/edit`}/>

        <div className={"flex justify-center"}>
            <div className={"w-[1024px]"}>
                <div className={"pt-10 pb-10"}>

                    <div className={"flex bg-white p-5 rounded-xl shadow-xl"}>
                        <div className={"flex absolute"}>
                            <Button
                                as={Link}
                                href={`/admin/user`}
                                variant={"faded"}
                            >
                                &lt; 返回
                            </Button>
                        </div>

                        <div className={"flex flex-1 justify-center p-1.5"}>
                            <Tooltip content={userDetail.username}>
                                <div className={"flex gap-2.5 items-center"}>
                                    <span
                                        className={"text-gray-950 font-bold text-xl"}>编辑 - {userDetail.username}</span>
                                </div>
                            </Tooltip>
                        </div>

                        <div className={"flex"}>
                            <div className={"flex gap-2.5 items-center justify-end"}>
                                <DeleteConfirm userId={userId}/>
                            </div>
                        </div>
                    </div>

                    <div className={"flex bg-white p-10 rounded-xl shadow-xl mt-5 flex-col gap-5 w-full"}>
                        <div className={"w-full justify-center flex"}>
                            <UserForm user={userDetail} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}
