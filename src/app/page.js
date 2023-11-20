"use server"
import React from "react";
import NavBarComp from "@/component/layout/navbar";
import {Button, Image, Link, Tooltip, User} from "@nextui-org/react";

export default async function Home() {
    const courseInfo = {
        courseName: "项目管理与过程改进",
        courseNumber: "(2023-2024-1)-12003580-01",
        courseDescription: "本课程主要介绍项目管理的基本概念、原理、方法和工具，以及项目管理的过程改进方法。课程内容包括项目管理的基本概念、原理、方法和工具；项目管理的过程改进方法；项目管理的过程改进工具。本课程主要介绍项目管理的基本概念、原理、方法和工具，以及项目管理的过程改进方法。课程内容包括项目管理的基本概念、原理、方法和工具；项目管理的过程改进方法；项目管理的过程改进工具。本课程主要介绍项目管理的基本概念、原理、方法和工具，以及项目管理的过程改进方法。课程内容包括项目管理的基本概念、原理、方法和工具；项目管理的过程改进方法；项目管理的过程改进工具。本课程主要介绍项目管理的基本概念、原理、方法和工具，以及项目管理的过程改进方法。课程内容包括项目管理的基本概念、原理、方法和工具；项目管理的过程改进方法；项目管理的过程改进工具。本课程主要介绍项目管理的基本概念、原理、方法和工具，以及项目管理的过程改进方法。课程内容包括项目管理的基本概念、原理、方法和工具；项目管理的过程改进方法；项目管理的过程改进工具。",
        courseType: "必修",
        coursePicture: null,
        studentCount: 114,
    }

    const teacherList = [
        {
            user_id: 1,
            username: "admin",
            name: "管理员",
            avatar: "https://1906.usst.edu.cn/api/uploads/5658635/modified-image?thumbnail=200x200&crop_box=10,0,287,277"
        },
        {
            user_id: 2,
            username: "teacher",
            name: "教师",
            avatar: "https://1906.usst.edu.cn/api/uploads/5658635/modified-image?thumbnail=200x200&crop_box=10,0,287,277"
        },
    ]

    return (
        <main>
            <NavBarComp/>
            <div className={""}>
                <div className={"flex justify-center"}>
                    <div className={"w-[1024px] p-5 mt-5"}>
                        <div
                            className={"flex flex-row w-full bg-white rounded-lg shadow-xl p-10"}>
                            <div className={"mr-10 rounded-2xl overflow-hidden"}>
                                <Image
                                    width={300}
                                    height={200}
                                    src={courseInfo.coursePicture || "/course-cover.png"}
                                    alt={courseInfo.courseName}
                                />
                            </div>
                            <div className={"flex flex-col justify-center"}>
                                <div className={"text-2xl font-bold text-gray-950"}>{courseInfo.courseName}</div>
                                <div className={"text-lg text-gray-700"}>{courseInfo.courseNumber}</div>
                                <div>
                                    <Button
                                        className={"mt-5"}
                                        color={"primary"}
                                        as={Link}
                                        href={"/content"}
                                    >
                                        开始学习（{courseInfo.studentCount}人）
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className={"flex flex-row w-full mt-10"}>
                            <div className={"flex flex-col w-full bg-white rounded-lg shadow-xl p-10"}>
                                <h2 className={"text-2xl font-bold text-gray-950"}>课程简介</h2>
                                <div className={"mt-5 text-gray-700"}>{courseInfo.courseDescription}</div>
                            </div>
                            <div className={"flex flex-col ml-7"}>
                                <div className={"w-[300px] bg-white rounded-lg shadow-xl p-5"}>
                                    <h2 className={"text-xl font-bold text-gray-950 border-l-5 pl-2"}>课程信息</h2>
                                    <div className={"mt-5"}>
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td className={"text-gray-700 w-[80px]"}>
                                                    课程名称
                                                </td>
                                                <td className={"text-gray-700 text-right"}>
                                                    <Tooltip content={courseInfo.courseName}>
                                                        <span className={"line-clamp-1 break-all"}>{courseInfo.courseName}</span>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={"text-gray-700"}>
                                                    课程类型
                                                </td>
                                                <td className={"text-gray-700 text-right line-clamp-1"}>
                                                    {courseInfo.courseType}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={"text-gray-700"}>
                                                    课程编号
                                                </td>
                                                <td className={"text-gray-700 text-right"}>
                                                    <Tooltip content={courseInfo.courseNumber}>
                                                        <span className={"line-clamp-1 break-all"}>{courseInfo.courseNumber}</span>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={"text-gray-700"}>
                                                    学生人数
                                                </td>
                                                <td className={"text-gray-700 text-right line-clamp-1"}>
                                                    {courseInfo.studentCount}人
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className={"w-[300px] bg-white rounded-lg shadow-xl p-5 mt-5"}>
                                    <h2 className={"text-xl font-bold text-gray-950 border-l-5 pl-2"}>授课教师</h2>
                                    <div className={"mt-5"}>
                                        {
                                            teacherList.map((teacher) => {
                                                return (
                                                    <div className={"mt-1.5"} key={teacher.user_id}>
                                                        <User
                                                            name={teacher.name}
                                                            description={`${teacher.username} #${teacher.user_id}`}
                                                            avatarProps={{
                                                                src: teacher.avatar,
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
