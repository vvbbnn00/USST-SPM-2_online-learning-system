"use client";

import FileIconRounded from "@/components/layout/file-icon-rounded";
import {parseSize} from "@/utils/string";

export default function DefaultPreview({file}) {
    return <div className={"flex w-full rounded-xl overflow-hidden justify-center p-10"}>
        <div className={"p-16 flex justify-center border flex-col shadow-xl rounded-xl"}>
            <FileIconRounded type={file.type} size={96}/>
            <div className={"text-center mt-4"}>
                <div className={"text-lg font-bold"}>{file.name}</div>
                <div className={"text-sm text-gray-500"}>{parseSize(file.size)}</div>
            </div>
        </div>
    </div>
}
