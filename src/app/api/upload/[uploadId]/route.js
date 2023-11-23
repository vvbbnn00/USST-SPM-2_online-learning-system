import {NextResponse} from "next/server";
import {getFileById} from "@/service/file";
import {getUserData, isTeacher} from "@/utils/auth";

export async function POST(request, {params}) {
    const {uploadId} = params;

    // TODO 上报上传成功信息

    return NextResponse.json({
        code: 200,
        message: 'ok',
    })
}


export async function GET(request, {params}) {
    const userData = await getUserData();
    if (!userData) {
        return NextResponse.json({
            code: 401,
            message: '请先登录'
        }, {
            status: 401
        })
    }

    let {uploadId} = params;
    if (isNaN(uploadId)) {
        return NextResponse.json({
            code: 404,
            message: '文件不存在',
        }, {
            status: 404
        })
    }

    let hasAccess = false;
    if (await isTeacher()) {
        hasAccess = true;
    }

    try {
        const file = await getFileById({
            fileId: uploadId
        });

        if (file.fileCreateBy === userData.userId) {
            hasAccess = true;
        }

        if (!hasAccess) {
            return NextResponse.json({
                code: 403,
                message: '您没有权限这么做。',
            }, {
                status: 403
            })
        }

        return NextResponse.json(file);
    } catch (e) {
        return NextResponse.json({
            code: 404,
            message: '文件不存在',
        }, {
            status: 404
        })
    }
}
