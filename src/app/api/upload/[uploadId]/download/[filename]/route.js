import {getIpAddressFromRequest} from "@/utils/ip";
import {getUserData, isTeacher} from "@/utils/auth";
import {getFileById} from "@/service/file";
import {generateDownloadUrlByFileStorageId} from "@/utils/file";
import {NextResponse} from "next/server";

export async function GET(request, {params}) {
    const ip = getIpAddressFromRequest();
    let {uploadId} = params;
    let userData = null;

    if (isNaN(uploadId)) {
        return new Response(null, {
            status: 404
        });
    }

    let hasAccess = false;
    // 允许文件预览组件访问
    if (ip.indexOf("192.168.20.10") !== -1) {
        hasAccess = true;
    } else {
        userData = await getUserData();
        if (!userData) {
            return new Response(null, {
                status: 401
            });
        }
    }
    if (await isTeacher()) {
        hasAccess = true;
    }


    try {
        const file = await getFileById({
            fileId: uploadId
        });

        if (file.fileCreateBy === userData?.userId) {
            hasAccess = true;
        }

        if (!hasAccess) {
            return new Response(null, {
                status: 403
            });
        }

        const url = generateDownloadUrlByFileStorageId(file.fileStorageId, file.fileName);

        return NextResponse.redirect(url);
    } catch (e) {
        return new Response(null, {
            status: 404
        });
    }
}
