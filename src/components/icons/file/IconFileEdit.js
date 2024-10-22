import React from "react";

export const IconFileEdit = ({fill, size, height, width, ...props}) => {
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
                  d="M321.6 346.5h381c21.4 0 39-17.5 39-39 0-21.4-17.5-39-39-39h-381c-21.4 0-39 17.5-39 39 0 21.4 17.5 39 39 39zM282.6 488.5c0 21.4 17.5 39 39 39h381c21.4 0 39-17.5 39-39 0-21.4-17.5-39-39-39h-381c-21.5 0-39 17.5-39 39zM908.5 113.9c0-27.6-22.4-50-50-50H166.8c-27.6 0-50 22.4-50 50v794.7c0 27.6 22.4 50 50 50h307.3c20.8-0.3 37.5-17.2 37.5-38s-16.7-37.7-37.5-38H192.8V139.9h639.7v418.8c0 21 17 38 38 38s38-17 38-38V113.9zM568.8 954.6l105.9-26.5-68.4-72.8zM623.9 839.9l66.2 70.6 167.6-174.3-68.4-70.5zM820.2 634.8L807 650.2l68.4 72.8 13.2-13.2c22.1-24.3 6.6-41.9-11-61.8-19.9-19.8-37.5-35.3-57.4-13.2z"/>
        </svg>
    );
}
