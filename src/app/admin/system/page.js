"use server"
import React from "react";
import NavBarComp from "@/components/layout/navbar";
import {notFound} from "next/navigation";
import {isAdmin} from "@/utils/auth";
import {getCourseConfig} from "@/service/course";
import SystemForm from "@/app/admin/system/system-form";

export default async function SystemConfig({searchParams, params}) {
    if (!await isAdmin()) {
        return notFound();
    }

    const courseInfo = await getCourseConfig();

    return <>
        <NavBarComp route={"/admin/system"}/>

        <div className={"flex justify-center"}>
            <div className={"w-[1024px]"}>
                <div className={"pt-10 pb-10"}>

                    <div className={"flex bg-white p-5 rounded-xl shadow-xl"}>
                        <div className={"flex flex-1 justify-center p-1.5"}>
                            <div className={"flex gap-2.5 items-center"}>
                                <span className={"text-gray-950 font-bold text-xl"}>编辑系统信息</span>
                            </div>
                        </div>

                    </div>

                    <div className={"flex bg-white p-10 rounded-xl shadow-xl mt-5 flex-col gap-5 w-full"}>
                        <div className={"w-full justify-center flex"}>
                            <SystemForm systemConfig={{
                                courseConfig: courseInfo,
                            }}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}
