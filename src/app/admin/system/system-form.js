"use client";
import {Button, Input, Select, SelectItem, Textarea} from "@nextui-org/react";
import React from "react";
import {useFormStatus, useFormState} from "react-dom";
import {formEditSystemConfig} from "@/app/admin/system/action";

const Submit = () => {
    const {pending} = useFormStatus();

    return <Button
        auto
        type={"submit"}
        color={"primary"}
        size={"lg"}
        className={"w-full"}
        isLoading={pending}
    >
        保存
    </Button>
}

export default function SystemForm({systemConfig}) {

    const [state, formAction] = useFormState(formEditSystemConfig, {});
    const {courseConfig} = systemConfig;

    return <div className={"w-[500px]"}>
        <form className={"flex flex-col gap-5"} action={formAction}>

            {(state?.code && state?.code !== 200) &&
                <div className={"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"}
                     role="alert">
                    <strong className={"font-bold"}>
                        更新失败：
                    </strong>
                    <span className={"block sm:inline"}>{state?.message}</span>
                </div>
            }

            {(state?.code === 200) &&
                <div className={"bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"}
                     role="alert">
                    <strong className={"font-bold"}>
                        更新成功：
                    </strong>
                    <span className={"block sm:inline"}>{state?.message}</span>
                </div>
            }

            <div>
                <Input
                    label={"课程名称"}
                    isRequired
                    size={"lg"}
                    type={"text"}
                    name={"courseConfig.courseName"}
                    minLength={1}
                    maxLength={255}
                    defaultValue={courseConfig?.courseName}
                />
                <div className="text-default-500 text-small mt-1">
                    课程名称将显示在课程首页、导航栏等位置，建议使用简短的名称。
                </div>
            </div>

            <div>
                <Textarea
                    label={"课程简介"}
                    isRequired
                    size={"lg"}
                    type={"text"}
                    name={"courseConfig.courseDescription"}
                    defaultValue={courseConfig?.courseDescription}
                />
                <div className="text-default-500 text-small mt-1">
                    课程简介将显示在课程首页，不支持换行、HTML标签等。
                </div>
            </div>

            <div>
                <Input
                    label={"课程代码"}
                    isRequired
                    size={"lg"}
                    type={"text"}
                    name={"courseConfig.courseId"}
                    minLength={1}
                    maxLength={255}
                    defaultValue={courseConfig?.courseId}
                />
            </div>

            <div>
                <Input
                    label={"课程封面"}
                    placeholder={"请输入课程封面URL"}
                    size={"lg"}
                    type={"text"}
                    name={"courseConfig.courseCover"}
                    defaultValue={courseConfig?.courseCover}
                />
                <div className="text-default-500 text-small mt-1">
                    课程封面将显示在课程首页，仅支持URL链接，请注意保证链接的有效性，同时建议使用HTTPS链接，为防止XSS攻击，请仔细检查链接的有效性。
                </div>
            </div>

            <div>
                <Select
                    label="课程类型"
                    placeholder="设置课程类型"
                    size={"lg"}
                    isRequired
                    name={"courseConfig.courseType"}
                    defaultSelectedKeys={[courseConfig?.courseType]}
                >
                    <SelectItem value={"public"} key={"选修"}>
                        {"选修"}
                    </SelectItem>
                    <SelectItem value={"private"} key={"必修"}>
                        {"必修"}
                    </SelectItem>
                </Select>
            </div>

            <div>
                <Submit/>
            </div>
        </form>
    </div>
}
