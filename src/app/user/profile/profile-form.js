"use client";
import {Button, Input} from "@nextui-org/react";
import React, {useEffect} from "react";
import {useFormState, useFormStatus} from "react-dom";
import {formUpdateUserProfile} from "@/components/layout/user-profile/actions";

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

export default function ProfileForm({userdata}) {

    const [state, formAction] = useFormState(formUpdateUserProfile, {});

    console.log(userdata);

    useEffect(() => {
        if (state?.code === 200) {
            location.href = `/user/profile`;
        }
    },[state]);

    return(
        <div className={"w-[500px]"}>
            <form className={"flex flex-col gap-5"} action={formAction}>

                {
                    (state?.code && state?.code !== 200) &&
                    <div className={"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"}
                         role="alert">
                        <strong className={"font-bold"}>
                            更新失败:
                        </strong>
                        <span className={"block sm:inline"}>{state?.message}</span>
                    </div>
                }

                <input name={"user_id"} type={"hidden"} value={userdata?.userId}/>
                <Input
                    label={"用户名称"}
                    size={"lg"}
                    type={"text"}
                    disabled
                    defaultValue={userdata?.name}
                />
                <Input
                    label={"学工号"}
                    type="number"
                    size={"lg"}
                    disabled
                    defaultValue={userdata?.employeeId}
                />
                <Input
                    label={"原密码"}
                    size={"lg"}
                    type={"password"}
                    name={"origin_password"}
                    minLength={1}
                    maxLength={255}
                />
                <Input
                    label={"修改密码"}
                    size={"lg"}
                    type={"password"}
                    name={"password"}
                    minLength={1}
                    maxLength={255}
                />
                <Input
                    label={"头像URL"}
                    size={"lg"}
                    type={"text"}
                    name={"avatar"}
                    minLength={1}
                    maxLength={255}
                    defaultValue={userdata?.avatar}
                />

                <div>
                    <Submit/>
                </div>

            </form>
        </div>
    )

}