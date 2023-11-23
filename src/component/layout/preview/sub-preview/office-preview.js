"use client";
import React, {useEffect, useState} from "react";

export default function OfficePreview({file}) {

    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        setPreviewUrl(`${location.protocol}//${location.hostname}:8012${file.previewUrl}`);
    }, []);

    return <div className={"flex w-full mb-10 h-[768px]"}>
        <iframe src={previewUrl} className={"w-full h-[768px]"}
                style={{
                    height: "768px",
                }}>
        </iframe>
    </div>
}
