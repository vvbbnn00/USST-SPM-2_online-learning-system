import {getUserData} from "@/utils/auth";
import {NextResponse} from "next/server";
import {generateUploadUrl} from "@/utils/file";

export async function POST() {
    const user = await getUserData();
    if (!user) return NextResponse.json({
        code: 401,
        message: '请先登录'
    }, {
        status: 401
    });

    return NextResponse.json({
        code: 200,
        message: 'ok',
        uploadId: 1,
        uploadUrl: generateUploadUrl()
    })
}
