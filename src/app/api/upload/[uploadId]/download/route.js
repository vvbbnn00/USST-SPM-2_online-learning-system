import {redirect} from "next/navigation";

export async function GET(request, {params}) {
    let {uploadId} = params;
    // uploadId可以是数字id，也可以是数字id+.后缀

    if (isNaN(uploadId)) {
        return new Response(null, {
            status: 404
        });
    }

    return redirect(`/api/upload/${uploadId}/download/${uploadId}`)
}
