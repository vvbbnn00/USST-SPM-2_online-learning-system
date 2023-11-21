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

function chooseBgIcon(type, size) {
    switch (type) {
        case "pdf":
            return ["#990000", <IconFilePdf fill={"#ffffff"} size={size}/>]
        case "pptx":
        case "ppt":
            return ["#994d00", <IconFilePpt fill={"#ffffff"} size={size}/>]
        case "doc":
        case "docx":
            return ["#000599", <IconFileWord fill={"#ffffff"} size={size}/>]
        case "xlsx":
        case "xls":
            return ["#009900", <IconFileExcel fill={"#ffffff"} size={size}/>]
        case "mp4":
        case "avi":
        case "mov":
        case "wmv":
        case "rmvb":
            return ["#4d0099", <IconFileVideo fill={"#ffffff"} size={size}/>]
        case "zip":
        case "rar":
            return ["#99004d", <IconFileZip fill={"#ffffff"} size={size}/>]
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
        case "bmp":
        case "webp":
            return ["#808080", <IconFileImage fill={"#ffffff"} size={size}/>]
        case "mp3":
        case "wav":
        case "flac":
        case "ape":
        case "aac":
        case "ogg":
            return ["#808080", <IconFileAudio fill={"#ffffff"} size={size}/>]
        default:
            return ["#808080", <IconFileFile fill={"#ffffff"} size={size}/>]
    }
}

export default function FileIconRounded({type, size}) {
    const [color, icon] = chooseBgIcon(type, size);

    return <div className={"rounded-full p-2.5"} style={{
        background: color,
        padding: size ? size / 4 : null,
    }}>
        {icon}
    </div>

}
