"use client";

import {useState} from "react";
import PdfPreview from "@/app/content/[contentId]/preview/pdf-preview";
import OfficePreview from "@/app/content/[contentId]/preview/office-preview";
import ImagePreview from "@/app/content/[contentId]/preview/image-preview";

function renderPreview(file) {
    switch (file.type) {
        case "pdf":
            return <PdfPreview file={file}/>
        case "doc":
        case "ppt":
        case "xls":
        case "docx":
        case "pptx":
        case "xlsx":
            return <OfficePreview file={file}/>
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
        case "bmp":
        case "webp":
            return <ImagePreview file={file}/>
        case "mp4":
        case "avi":
        case "mov":
        case "wmv":
        case "rmvb":
            return <div>视频预览</div>

        default:
            return <div>不支持的文件类型</div>
    }
}

export default function FilePreview({file}) {

    return <div className={"flex w-full"}>
        {renderPreview(file)}
    </div>
}
