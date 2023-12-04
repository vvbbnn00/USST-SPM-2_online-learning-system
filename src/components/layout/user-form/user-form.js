"use client";
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import React, {useEffect} from "react";
import {useFormStatus, useFormState} from "react-dom";
import {doUpdateUserInfo} from "@/components/layout/user-form/actions";

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

export default function UserForm({user}) {
    const [state, formAction] = useFormState(doUpdateUserInfo, {});

    useEffect(() => {
        if (state?.code === 200 && state?.userId) {
            location.href = `/admin/user/${state?.userId}/edit`;
        }
    }, [state]);

    return <div className={"w-[500px]"}>
        <form className={"flex flex-col gap-5"} action={formAction}>

            {(state?.code && state?.code !== 200) &&
                <div className={"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"}
                     role="alert">
                    <strong className={"font-bold"}>
                        {user ? "更新" : "创建"}失败：
                    </strong>
                    <span className={"block sm:inline"}>{state?.message}</span>
                </div>
            }

            {
                (state?.code === 200) &&
                <div className={"bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"}
                     role="alert">
                    <strong className={"font-bold"}>{user ? "更新" : "创建"}成功：</strong>
                    <span className={"block sm:inline"}>{state?.message}</span>
                </div>
            }

            <input name={"userId"} type={"hidden"} value={user?.userId}/>
            <Input
                label={"用户名"}
                isRequired
                size={"lg"}
                type={"text"}
                name={"username"}
                minLength={1}
                maxLength={255}
                defaultValue={user?.username}
            />
            {
                !user ?
                    <Input
                        label={"密码"}
                        size={"lg"}
                        type={"password"}
                        name={"password"}
                        isRequired
                        minLength={1}
                        maxLength={255}
                    /> : <Input
                        label={"重置密码"}
                        size={"lg"}
                        type={"password"}
                        name={"password"}
                        minLength={1}
                        maxLength={255}
                        defaultValue={""}
                    />
            }
            <Select
                label={"角色"}
                size={"lg"}
                name={"role"}
                isRequired
                defaultSelectedKeys={[user?.role]}
            >
                <SelectItem value={"student"} key={"student"}>学生</SelectItem>
                <SelectItem value={"teacher"} key={"teacher"}>教师</SelectItem>
            </Select>
            <Input
                label={"姓名"}
                size={"lg"}
                type={"text"}
                name={"name"}
                isRequired
                minLength={1}
                maxLength={255}
                defaultValue={user?.name}
            />
            <Input
                label={"学工号"}
                size={"lg"}
                type={"text"}
                name={"employee_id"}
                isRequired
                minLength={1}
                maxLength={255}
                defaultValue={user?.employeeId}
            />
            <Input
                label={"头像Url"}
                size={"lg"}
                type={"text"}
                name={"avatar"}
                minLength={1}
                maxLength={255}
                defaultValue={user?.avatar}
            />

            <div>
                <Submit/>
            </div>
        </form>
    </div>
}
