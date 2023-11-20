"use client";

import {IconFilePdf} from "@/component/icons/file/IconFilePdf";
import {IconFilePpt} from "@/component/icons/file/IconFilePpt";
import {IconFileWord} from "@/component/icons/file/IconFileWord";
import {IconFileExcel} from "@/component/icons/file/IconFileExcel";
import {IconFileVideo} from "@/component/icons/file/IconFileVideo";
import {IconFileZip} from "@/component/icons/file/IconFileZip";
import {IconFileImage} from "@/component/icons/file/IconFileImage";
import {IconFileAudio} from "@/component/icons/file/IconFileAudio";
import {IconFileFile} from "@/component/icons/file/IconFileFile";

function chooseBgIcon(type) {
    switch (type) {
        case "pdf":
            return ["#990000", <IconFilePdf fill={"#ffffff"}/>]
        case "pptx":
        case "ppt":
            return ["#994d00", <IconFilePpt fill={"#ffffff"}/>]
        case "doc":
        case "docx":
            return ["#000599", <IconFileWord fill={"#ffffff"}/>]
        case "xlsx":
        case "xls":
            return ["#009900", <IconFileExcel fill={"#ffffff"}/>]
        case "mp4":
        case "avi":
        case "mov":
        case "wmv":
        case "rmvb":
            return ["#4d0099", <IconFileVideo fill={"#ffffff"}/>]
        case "zip":
        case "rar":
            return ["#99004d", <IconFileZip fill={"#ffffff"}/>]
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
        case "bmp":
        case "webp":
            return ["#808080", <IconFileImage fill={"#ffffff"}/>]
        case "mp3":
        case "wav":
        case "flac":
        case "ape":
        case "aac":
        case "ogg":
            return ["#808080", <IconFileAudio fill={"#ffffff"}/>]
        default:
            return ["#808080", <IconFileFile fill={"#ffffff"}/>]
    }
}

export default function FileIconRounded({type}) {
    const [color, icon] = chooseBgIcon(type);

    return <div className={"p-2.5 rounded-full"} style={{background: color}}>
        {icon}
    </div>

}
