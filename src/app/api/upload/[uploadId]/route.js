import {NextResponse} from "next/server";
import {getFileById, updateFileStatus} from "@/service/file";
import {getUserData, isTeacher} from "@/utils/auth";

async function hasAccess({uploadId, userData, file = null, checkStatus = true}) {
    let hasAccess = false;
    if (await isTeacher()) {
        hasAccess = true;
    }

    try {
        if (!file) {
            file = await getFileById({
                fileId: uploadId,
                checkStatus
            });
        }

        if (file.fileCreateBy === userData.userId) {
            hasAccess = true;
        }
    } catch (e) {
        throw e;
    }

    return hasAccess;
}

export async function POST(request, {params}) {
    const {uploadId} = params;
    const requestBody = await request.json();
    const storageId = requestBody.storageId;
    if (!storageId) {
        return NextResponse.json({
            code: 400,
            message: 'storageId不能为空'
        }, {
            status: 400
        })
    }

    const userData = await getUserData();
    if (!userData) {
        return NextResponse.json({
            code: 401,
            message: '请先登录'
        }, {
            status: 401
        })
    }

    try {
        const hasAccessResult = await hasAccess({
            uploadId, userData, checkStatus: false
        });
        if (!hasAccessResult) {
            return NextResponse.json({
                code: 403,
                message: '您没有权限这么做。',
            }, {
                status: 403
            })
        }
    } catch (e) {
        return NextResponse.json({
            code: 404,
            message: '文件不存在',
        }, {
            status: 404
        })
    }

    try {
        const ret = await updateFileStatus({
            fileId: uploadId,
            storageId
        });
        if (!ret) {
            return NextResponse.json({
                code: 500,
                message: '服务器错误'
            }, {
                status: 500
            })
        }
    } catch (e) {
        console.error("[api/upload/[uploadId]/route.js] updateFileStatus error: ", e);
        return NextResponse.json({
            code: 500,
            message: '服务器错误'
        }, {
            status: 500
        })
    }

    return NextResponse.json({
        code: 200,
        message: 'ok'
    });
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


    try {
        const file = await getFileById({
            fileId: uploadId
        });
        const checkAccessResult = await hasAccess({
            uploadId, userData, file
        });
        if (!checkAccessResult) {
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
