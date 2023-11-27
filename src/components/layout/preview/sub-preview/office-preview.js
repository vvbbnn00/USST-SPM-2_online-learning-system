"use client";
import React, {useEffect, useState} from "react";
import {Button, Spinner} from "@nextui-org/react";
import {IconOpenInNewWindow} from "@/components/icons/IconOpenInNewWindow";

export default function OfficePreview({file}) {
    const [previewUrl, setPreviewUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPreviewUrl(`${location.protocol}//${location.hostname}:8012${file.previewUrl}`);
    }, []);

    return <div>
        <div className={"flex w-full justify-end mb-2.5"}>
            <Button
                auto
                onClick={() => {
                    window.open(previewUrl);
                }}
                startContent={<IconOpenInNewWindow size={20} />}
            >
                在新窗口打开
            </Button>
        </div>
        <div className={"flex w-full mb-10 h-[768px] relative"}>
            {loading && <div className={"w-full h-full flex flex-col gap-5 justify-center items-center bg-gray-100 absolute"}>
                <div><Spinner /></div>
                <div className={"text-xl text-gray-500 font-bold"}>正在加载</div>
            </div>}
            <iframe src={previewUrl}
                    className={"w-full h-[768px]"}
                    loading={"lazy"}
                    title={"office-preview"}
                    style={{
                        height: "768px",
                    }}
                    onLoad={() => {
                        setLoading(false);
                    }}
            >
            </iframe>
        </div>
    </div>
}
