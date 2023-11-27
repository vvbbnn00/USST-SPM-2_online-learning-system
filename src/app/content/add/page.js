"use server"
import React from "react";
import NavBarComp from "@/components/layout/navbar";
import {Button, Link} from "@nextui-org/react";
import ContentForm from "@/components/layout/content-form/content-form";
import {notFound} from "next/navigation";
import {isTeacher} from "@/utils/auth";

export default async function ContentsDetail() {
    if (!await isTeacher()) {
        return notFound();
    }

    return <>
        <NavBarComp route={"/content"}/>

        <div className={"flex justify-center"}>
            <div className={"w-[1024px]"}>
                <div className={"pt-10 pb-10"}>

                    <div className={"flex bg-white p-5 rounded-xl shadow-xl"}>
                        <div className={"flex absolute"}>
                            <Button
                                as={Link}
                                href={`/content`}
                                variant={"faded"}
                            >
                                &lt; 返回
                            </Button>
                        </div>

                        <div className={"flex flex-1 justify-center p-1.5"}>
                            <div className={"flex gap-2.5 items-center"}>
                                <span className={"text-gray-950 font-bold text-xl"}>新增 - 教学材料</span>
                            </div>
                        </div>

                    </div>

                    <div className={"flex bg-white p-10 rounded-xl shadow-xl mt-5 flex-col gap-5 w-full"}>
                        <div className={"w-full justify-center flex"}>
                            <ContentForm/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}
