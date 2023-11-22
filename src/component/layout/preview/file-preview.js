"use client";

import {useState} from "react";
import PdfPreview from "@/component/layout/preview/sub-preview/pdf-preview";
import OfficePreview from "@/component/layout/preview/sub-preview/office-preview";
import ImagePreview from "@/component/layout/preview/sub-preview/image-preview";
import VideoPreview from "@/component/layout/preview/sub-preview/video-preview";
import AudioPreview from "@/component/layout/preview/sub-preview/audio-preview";
import DefaultPreview from "@/component/layout/preview/sub-preview/default-preview";
import {Button} from "@nextui-org/react";

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
            return <VideoPreview file={file}/>
        case "mp3":
        case "wav":
        case "flac":
        case "ape":
        case "aac":
        case "ogg":
            return <AudioPreview file={file}/>
        default:
            return <DefaultPreview file={file}/>
    }
}

export default function FilePreview({file}) {

    return <div className={"flex w-full flex-col"}>
        {renderPreview(file)}
    </div>
}
