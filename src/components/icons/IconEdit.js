import React from "react";

export const IconEdit = ({fill, size, height, width, ...props}) => {
    return (
        <svg
            fill={fill || "currentColor"}
            height={size || height || 24}
            viewBox="0 0 1024 1024"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M465.654 852.308l429.529-509.401c27.574-32.622 23.301-81.943-9.321-109.388L727.669 99.922c-32.622-27.574-81.943-23.301-109.388 9.321L188.623 618.644l-24.854 271.595c-0.907 9.968 3.107 19.807 10.745 26.279s17.994 8.803 27.703 6.213l263.439-70.422zM587.213 242.32l182.141 153.533-311.077 368.944-182.141-153.662 311.077-368.814z m100.327-94.888l158.322 133.467c6.473 5.438 7.249 15.405 1.812 21.878l-38.577 45.826L627.085 195.07l38.577-45.826c5.438-6.473 15.534-7.249 21.878-1.812zM229.014 851.79l16.959-184.731 162.335 136.833-179.293 47.899z"
            ></path>
        </svg>
    );
}
