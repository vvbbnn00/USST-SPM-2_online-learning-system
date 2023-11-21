"use client";

import FileIconRounded from "@/component/layout/file-icon-rounded";

function calcSize(bytes) {
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}

export default function DefaultPreview({file}) {
    return <div className={"flex w-full rounded-xl overflow-hidden justify-center p-10"}>
        <div className={"p-16 flex justify-center border flex-col shadow-xl rounded-xl"}>
            <FileIconRounded type={file.type} size={96}/>
            <div className={"text-center mt-4"}>
                <div className={"text-lg font-bold"}>{file.name}</div>
                <div className={"text-sm text-gray-500"}>{calcSize(file.size)}</div>
            </div>
        </div>
    </div>
}
