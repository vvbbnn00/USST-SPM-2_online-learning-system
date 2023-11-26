import {getUserData, isTeacher} from "@/utils/auth";
import {NextResponse} from "next/server";
import {generateUploadUrl} from "@/utils/file";
import {insertFile} from "@/service/file";

export async function POST(request) {
    const user = await getUserData();
    if (!user) return NextResponse.json({
        code: 401,
        message: '请先登录'
    }, {
        status: 401
    });

    // 目前只有老师可以上传文件
    if (!await isTeacher()) return NextResponse.json({
        code: 403,
        message: '您没有权限这么做'
    }, {
        status: 403
    });

    const requestBody = await request.json();
    try {
        if (!requestBody.fileName) throw new Error('文件名不能为空');
        if (requestBody.fileName.length > 255) throw new Error('文件名过长');
        if (!requestBody.fileType) throw new Error('文件类型不能为空');
        if (requestBody.fileType.length > 20) throw new Error('文件类型过长');
        if (!requestBody.fileSize) throw new Error('文件大小不能为空');
        if (isNaN(requestBody.fileSize)) throw new Error('文件大小必须是数字');
        if (requestBody.fileSize <= 0) throw new Error('文件大小必须大于0');
    } catch (e) {
        return NextResponse.json({
            code: 400,
            message: e.message
        }, {
            status: 400
        });
    }
    const {fileName, fileType, fileSize} = requestBody;

    const uploadFileId = await insertFile({
        fileName,
        fileType,
        fileSize
    });

    if (!uploadFileId) return NextResponse.json({
        code: 500,
        message: '服务器错误'
    }, {
        status: 500
    });

    return NextResponse.json({
        code: 200,
        message: 'ok',
        uploadId: uploadFileId,
        uploadUrl: generateUploadUrl()
    })
}
