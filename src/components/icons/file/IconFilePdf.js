import React from "react";

export const IconFilePdf = ({fill, size, height, width, ...props}) => {
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
                  d="M634.5 60.7h-419c-19.8 0-38.7 7.8-52.7 21.8C149.3 96 141 114.6 141 135.2v745.2c0 19.8 7.8 38.7 21.8 52.7s32.9 21.9 52.7 21.8h596.1c19.8 0 38.7-7.8 52.7-21.8 13.5-13.5 21.8-32.1 21.8-52.7l0.1-581.6L634.5 60.7z m-9.1 94.1l137 129.4h-137V154.8z m186.3 725.6H215.5V135.2h335.3v186.3c0 9.9 3.9 19.4 10.9 26.4s16.5 10.9 26.4 10.9h223.6v521.6zM482.8 464.1c-8.7-14.2-16.5-28.9-23.5-44-2.1-6.1-3.9-11.2-5.5-15.1-3.6-9.1-4.2-10.4-8.8-15.4-4.3-6.8-4.3-6.8-35.8-9.4-24.7 22.5-24.7 22.5-23.5 31.2 0.4 7.6 0.4 7.6 1 9.6 0.8 3.1 0.8 3.1 1.6 5.4 1.8 5.2 4.2 11.4 7.3 18.4 1.8 5.5 3.9 12 6.2 19.4 5.1 16.7 7.2 34.8 6.5 54.2-1.8 44.1-17.9 93-44.4 143.8-11.8 22.4-24.7 44.2-38.8 65.2-3.6 5.5-4.5 7-5.8 9-2.7 3.8-4.8 8-6.1 12.4-1.9 5.2-1.9 5.2 0.8 22.9 22 23.4 22 23.4 40.4 20.7 12-5.2 12-5.2 14.3-7.4 2.2-1.8 4.6-4 8.1-7.5 22.4-22 70.4-39.1 143.6-48.2 18.3-2.7 31.1-19.6 28.8-38-2.3-18.4-18.9-31.6-37.3-29.7-29.1 3.7-55.3 8.5-78.6 14.6 18.3-38 31.4-75 38.2-111.2 54.4 64.1 123.8 110.4 208.9 127.1 18.5 3.6 36.4-8.4 40.1-26.9 3.6-18.5-8.4-36.5-26.9-40.1-90.1-17.7-160.4-78.4-210.8-161z"/>
        </svg>
    );
}