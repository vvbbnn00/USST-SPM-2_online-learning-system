"use client";

import React, {useEffect, useState} from "react";
import {Spinner} from "@nextui-org/react";

export default function PdfPreview({file}) {
    const pdfPath = encodeURIComponent(file.previewUrl);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setUrl(`/pdf-js/web/viewer.html?file=${pdfPath}`);
    }, []);

    return <div className={"flex w-full rounded-xl overflow-hidden mb-10 h-[768px]"}>
        {loading && <div className={"w-full h-full flex flex-col gap-5 justify-center items-center bg-gray-100"}>
            <div><Spinner /></div>
            <div className={"text-xl text-gray-500 font-bold"}>正在加载</div>
        </div>}
        <iframe src={url}
                className={"w-full h-[768px]"}
                loading={"lazy"}
                title={"pdf-preview"}
                style={{
                    height: "768px",
                    width: loading ? "0px" : "100%",
                }}
                onLoad={() => {
                    setLoading(false);
                }}
        >
        </iframe>
    </div>
}
