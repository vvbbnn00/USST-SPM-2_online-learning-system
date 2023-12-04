import {isAdmin} from "@/utils/auth";
import {NextResponse} from "next/server";
import {deleteUser, getUserInfo} from "@/service/user";

export async function DELETE(request, {params}) {
    if (!await isAdmin()) {
        return NextResponse.json({
            code: 403,
            message: '您没有权限这么做'
        }, {
            status: 403
        });
    }

    const userId = params.userId;
    if (isNaN(userId)) {
        return NextResponse.json({
            code: 400,
            message: '参数错误'
        }, {
            status: 400
        });
    }

    const user = await getUserInfo({
        userId: params.userId
    });

    if (!user) {
        return NextResponse.json({
            code: 404,
            message: '用户不存在'
        }, {
            status: 404
        });
    }

    try {
        await deleteUser({
            userId: params.userId
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
