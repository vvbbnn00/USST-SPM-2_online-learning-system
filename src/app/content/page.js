"use server"
import React from "react";
import NavBarComp from "@/component/layout/navbar";
import {Button, Image, Link, Tooltip, User} from "@nextui-org/react";
import ContentList from "@/app/content/content-list";

export default async function Contents() {

    // TODO: fetch content list from server
    const contentList = [
        {
            content_id: 1,
            name: "教学材料1",
            type: "pdf",
            status: "finished",
            progress: {
                total: 20,
                finished: 10
            },
            chapter: "第一章 绪论"
        }, {
            content_id: 2,
            name: "教学材料2",
            type: "ppt",
            status: "finished",
            progress: {
                total: 20,
                finished: 10
            },
            chapter: "第一章 绪论"
        }, {
            content_id: 3,
            name: "很好的教学材料1",
            type: "doc",
            status: "finished",
            progress: {
                total: 20,
                finished: 1
            },
            chapter: "第二章 项目初始"
        }, {
            content_id: 4,
            name: "很好的教学材料2",
            type: "mp4",
            status: "finished",
            progress: {
                total: 10,
                finished: 10
            },
            chapter: "第二章 项目初始"
        }, {
            content_id: 5,
            name: "很好的教学材料3",
            type: "png",
            status: "unfinished",
            progress: {
                total: 10,
                finished: 10
            },
            chapter: "第二章 项目初始"
        },
    ]

    return <>
        <NavBarComp route={"/content"}/>

        <div className={"flex justify-center"}>
            <div className={"w-[1024px]"}>
                <div className={"pt-10 pb-10"}>
                    <ContentList contentList={contentList}/>
                </div>
            </div>
        </div>
    </>
}
