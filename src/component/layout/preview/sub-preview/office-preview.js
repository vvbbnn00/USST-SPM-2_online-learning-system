"use client";
import React from "react";

export default function OfficePreview({file}) {

    return <div className={"flex w-full mb-10"}>
        <iframe src={file.previewUrl} className={"w-full h-[768px]"}></iframe>
    </div>
}