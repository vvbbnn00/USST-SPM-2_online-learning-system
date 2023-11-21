"use client";

export default function PdfPreview({file}) {
    const pdfPath = encodeURIComponent(file.url)
    const url = `/pdf-js/web/viewer.html?file=${pdfPath}`

    return <div className={"flex w-full rounded-xl overflow-hidden"}>
        <iframe src={url} className={"w-full h-[768px]"}></iframe>
    </div>
}
