"use client";

export default function PdfPreview({file}) {
    const pdfPath = encodeURIComponent(file.previewUrl)
    const url = `/pdf-js/web/viewer.html?file=${pdfPath}`

    return <div className={"flex w-full rounded-xl overflow-hidden mb-10"}>
        <iframe src={url} className={"w-full h-[768px]"}></iframe>
    </div>
}
