"use client"
import React from "react";

const SearchBar = () => {
    const handleSearch = () => {
        // 处理搜索逻辑
        console.log("Performing search...");
    };

    return (
        <div className="flex items-center border p-2 space-x-2">
            <input
                type="text"
                placeholder="Search..."
                className="border-2 p-2 focus:outline-none focus:border-blue-500 flex-grow"
            />
            <button
                onClick={handleSearch}
                className="p-2 bg-blue-500 text-white rounded-md cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6M9 2a7 7 0 017 7c0 4.418-3.582 8-8 8a7 7 0 01-7-7 7 7 0 017-7 7 7 0 017 7z"
                    />
                </svg>
            </button>
        </div>
    );
};

export default SearchBar;
