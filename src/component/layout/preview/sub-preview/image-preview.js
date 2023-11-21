"use client";
import React from "react";
import {Image} from "@nextui-org/react";

export default function ImagePreview({file}) {

    return <div className={"flex w-full justify-center mb-10"}>
        <Image
            src={file.url}
            alt={file.name}
            className={"w-full max-h-[768px]"}
        />
    </div>
}
