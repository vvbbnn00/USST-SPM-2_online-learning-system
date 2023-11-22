import {NextResponse} from "next/server";

export async function POST(request, {params}) {
    const {uploadId} = params;

    return NextResponse.json({
        code: 200,
        message: 'ok',
    })
}
