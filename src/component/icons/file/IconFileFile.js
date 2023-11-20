import React from "react";

export const IconFileFile = ({fill, size, height, width, ...props}) => {
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
                  d="M908.4 114.4c0-27.6-22.4-50-50-50H166.7c-27.6 0-50 22.4-50 50v794.7c0 27.6 22.4 50 50 50H474c20.8-0.3 37.5-17.2 37.5-38s-16.7-37.7-37.5-38H192.7V140.4h639.7v481.3H645.9c-38 0-68.8 30.8-68.8 68.8V914c0 0.6 0 1.3 0.1 1.9-0.7 10.6 2.9 21.4 11 29.5 14.8 14.8 39 14.8 53.7 0l255.5-255.5c7.6-7.6 11.3-17.7 11.1-27.8V114.4zM671.9 697.6H782l-129 129V716.4c0.1-10.4 8.5-18.8 18.9-18.8zM321.5 347h381c21.4 0 39-17.5 39-39 0-21.4-17.5-39-39-39h-381c-21.4 0-39 17.5-39 39 0 21.4 17.5 39 39 39zM282.5 489c0 21.4 17.5 39 39 39h381c21.4 0 39-17.5 39-39 0-21.4-17.5-39-39-39h-381c-21.5 0-39 17.5-39 39z"/>
        </svg>
    );
}
