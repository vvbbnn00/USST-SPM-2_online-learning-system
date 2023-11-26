"use server"
import React from "react";
import NavBarComp from "@/components/layout/navbar";
import {Button, Image, Link, Tooltip, User} from "@nextui-org/react";
import {getCourseConfig} from "@/service/course";

export default async function Home() {
    const courseInfo = await getCourseConfig();
    const teacherList = courseInfo.teacherList;

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
                                    src={courseInfo.courseCover || "/course-cover.png"}
                                    alt={courseInfo.courseName}
                                />
                            </div>
                            <div className={"flex flex-col justify-center"}>
                                <div className={"text-2xl font-bold text-gray-950"}>{courseInfo.courseName}</div>
                                <div className={"text-lg text-gray-700"}>{courseInfo.courseId}</div>
                                <div>
                                    <Button
                                        className={"mt-5"}
                                        color={"primary"}
                                        as={Link}
                                        href={"/content"}
                                    >
                                        开始学习（{courseInfo.studentNumber}人）
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
                                                        <span
                                                            className={"line-clamp-1 break-all"}>{courseInfo.courseName}</span>
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
                                                    <Tooltip content={courseInfo.courseId}>
                                                        <span
                                                            className={"line-clamp-1 break-all"}>{courseInfo.courseId}</span>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className={"text-gray-700"}>
                                                    学生人数
                                                </td>
                                                <td className={"text-gray-700 text-right line-clamp-1"}>
                                                    {courseInfo.studentNumber}人
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
                                                    <div className={"mt-1.5"} key={teacher.userId}>
                                                        <User
                                                            name={teacher.name}
                                                            description={`${teacher.username} #${teacher.userId}`}
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
