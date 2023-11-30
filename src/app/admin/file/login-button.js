"use client";

import {useFormStatus} from "react-dom";
import {Button} from "@nextui-org/react";

export const LoginSubmitButton = () => {
    const {pending} = useFormStatus();

    return (<Button
        className="w-full text-white mt-5"
        type={"submit"}
        isLoading={pending}
        color={"primary"}
    >
        登录
    </Button>)
}
