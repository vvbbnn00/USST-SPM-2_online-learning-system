import React from "react";

export const IconFileExcel = ({fill, size, height, width, ...props}) => {
    return (
        <svg
            fill={fill || "#000000"}
            height={size || height || 24}
            viewBox="0 0 1024 1024"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path fill={fill || "#000000"}
                  d="M886.2 880.4c0 20.6-8.3 39.2-21.8 52.7-14 14-32.9 21.9-52.7 21.8H215.5c-19.8 0-38.7-7.8-52.7-21.8s-21.9-32.9-21.8-52.7V135.2c0-20.6 8.3-39.2 21.8-52.7 14-14 32.9-21.9 52.7-21.8h419l251.8 238.1-0.1 581.6zM762.4 284.2l-137-129.4v129.4h137z m49.3 596.2V358.8H588.1c-9.9 0-19.4-3.9-26.4-10.9s-10.9-16.5-10.9-26.4V135.2H215.5v745.2h596.2z m0 0M566.8 598.7l50.7 143.9c1.9 6.1 2.9 11 3.2 14.6 0.2 3.7-0.8 6.4-3.1 8.4s-6.2 3.2-11.6 3.7c-5.4 0.5-13 0.7-22.7 0.7-7 0-12.5-0.2-16.5-0.5-3.2-0.2-6.5-0.7-9.6-1.6-1.9-0.5-3.6-1.6-4.8-3.2-1-1.6-1.8-3.3-2.4-5.1L510 640l-84.6 119.7c-1.4 1.9-2.9 3.6-4.7 5.1-2 1.6-4.4 2.7-6.9 3.2-3 0.7-6.9 1.3-11.7 1.6-4.8 0.4-11.1 0.5-18.7 0.5-9 0-16-0.3-21.2-0.7-5.1-0.5-8.4-1.7-9.9-3.6-1.5-1.9-1.5-4.6 0.1-8.2 1.6-3.6 4.5-8.3 8.8-14.3L470 598.2l-46.1-134c-1.6-4.6-2.7-9.4-3.2-14.3-0.3-3.5 0.7-6.3 3.1-8.2 2.3-1.9 6.2-3.1 11.6-3.5 7.5-0.6 14.9-0.8 22.4-0.7 7.3 0 13 0.1 17.2 0.5 4.2 0.4 7.5 0.9 9.8 1.8 2.3 0.9 4.1 2 5.1 3.6 1 1.5 1.9 3.5 2.6 5.8l34.9 107.5L604.2 448c1.2-1.9 2.7-3.6 4.5-5.1 1.9-1.5 4.1-2.6 6.5-3.2 2.7-0.7 6.3-1.3 10.8-1.6 4.5-0.4 10.5-0.5 18-0.5 9.2 0 16.4 0.3 21.6 0.7 5.3 0.5 8.7 1.7 10.3 3.6 1.6 1.9 1.6 4.6 0.1 8.2-2.4 5-5.3 9.8-8.6 14.2L566.8 598.7z m0 0"/>
        </svg>
    );
}
