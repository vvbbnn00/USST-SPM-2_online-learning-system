import {isTeacher} from "@/utils/auth";
import {NextResponse} from "next/server";
import {getProgressByContentId} from "@/service/study-progress";


export async function GET(request, {params}) {
    if (!await isTeacher()) {
        return NextResponse.json({
            code: 403,
            message: '您没有权限这么做'
        }, {
            status: 403
        });
    }

    let {contentId} = params;
    contentId = Number(contentId);

    if (isNaN(contentId)) {
        return NextResponse.json({
            code: 400,
            message: '参数错误'
        }, {
            status: 400
        });
    }

    try {
        const progress = await getProgressByContentId({contentId})
        return NextResponse.json({
            code: 200,
            message: 'ok',
            data: progress
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
