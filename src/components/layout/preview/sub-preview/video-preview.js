"use client";
import React from 'react'
import {Player} from 'video-react';
import 'video-react/dist/video-react.css';

export default function VideoPreview({file}) {

    return <div className={"flex w-full rounded-xl overflow-hidden mb-10"}>
        <Player>
            <source src={file.previewUrl} />
        </Player>
    </div>
}
