import React from "react";

export const IconLogout = ({fill, size, height, width, ...props}) => {
    return (
        <svg
            fill={fill || "#515151"}
            height={size || height || 24}
            viewBox="0 0 1024 1024"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M952.7 492.1c-1.4-1.8-3.1-3.4-4.8-4.9l-179-178.9c-12.5-12.5-32.9-12.5-45.4 0s-12.5 32.9 0 45.4l126 126H421.3h-0.1c-18.2 0-32.9 14.8-32.9 33s14.7 33 32.9 33c0.3 0.1 0.5 0 0.7 0h427.8l-126 126c-12.3 12.3-12.3 32.4 0 44.7l0.7 0.7c12.3 12.3 32.4 12.3 44.7 0l182-182c11.7-11.7 12.3-30.6 1.6-43z"
                fill={fill || "#515151"}></path>
            <path
                d="M562.3 799c-18 0-32.7 14.7-32.7 32.7v63.8H129.2V128.7h400.4v63.1c0 18 14.7 32.7 32.7 32.7s32.7-14.7 32.7-32.7V96.3c0-3.5-0.6-6.8-1.6-10-4.2-13.3-16.6-23-31.2-23H96.6c-18 0-32.7 14.7-32.7 32.7v831.9c0 14.2 9.2 26.3 21.8 30.8 3.6 1.4 7.5 2.1 11.5 2.1h463.2c0.6 0 1.3 0.1 1.9 0.1 18 0 32.7-14.7 32.7-32.7v-96.5c0-18-14.7-32.7-32.7-32.7z"
                fill={fill || "#515151"}></path>
            <path d="M256.8 512.7a32.9 33 0 1 0 65.8 0 32.9 33 0 1 0-65.8 0Z" fill={fill || "#515151"}></path>
        </svg>
    );
}
