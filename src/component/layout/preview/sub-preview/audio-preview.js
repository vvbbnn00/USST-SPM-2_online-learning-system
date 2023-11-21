"use client";
import React from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function AudioPreview({file}) {
    const audioRef = React.useRef(null);

    return <div className={"flex w-full rounded-xl overflow-hidden"}>
        <div className={"w-full p-10 flex justify-center pb-10"}>
            <AudioPlayer
                autoPlay
                src={file.url}
                onPlay={e => console.log("onPlay")}
                ref={audioRef}
            />
        </div>
    </div>
}
