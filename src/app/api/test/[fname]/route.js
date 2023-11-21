import {NextResponse} from "next/server";

export async function GET(req) {
    return NextResponse.redirect("http://10.16.2.6:18080/file/download/1700581199/ed93a79f1a574dc66b4d7d00b372dd9a/d41d8cd98f00b204e9800998ecf8427e?n=1BkD3oSUrZ7MSqdKuSw8r2tGDXbO5kcA&t=1701581221&s=1c53e411007e8118e8188d50d842e1b630832cf1&filename=test.docx")
}
