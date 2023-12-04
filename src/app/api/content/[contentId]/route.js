import {isTeacher} from "@/utils/auth";
import {NextResponse} from "next/server";
import {deleteContent, getContentDetail} from "@/service/content";

export async function DELETE(request, {params}) {
    if (!await isTeacher()) {
        return NextResponse.json({
            code: 403,
            message: '您没有权限这么做'
        }, {
            status: 403
        });
    }

    const content = await getContentDetail({
        contentId: params.contentId
    });
    if (!content) {
        return NextResponse.json({
            code: 404,
            message: '资源不存在'
        }, {
            status: 404
        });
    }

    try {
        await deleteContent({
            contentId: params.contentId
        });

        return NextResponse.json({
            code: 200,
            message: 'ok'
        });
    } catch (e) {
        return NextResponse.json({
            code: 500,
            message: e.message
        }, {
            status: 500
        });
    }
}
