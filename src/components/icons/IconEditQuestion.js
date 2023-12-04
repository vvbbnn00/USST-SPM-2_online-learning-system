import React from "react";

export const IconEditQuestion = ({fill}) => {
    return(
        <svg
             className="icon"
             viewBox="0 0 1024 1024"
             version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             height="1em">
            <path
                d="M618.666667 288a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h298.666667zM704 480a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h384zM533.333333 672a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h213.333333z"
                fill={fill || "#111111"}></path>
            <path
                d="M768 85.333333a128 128 0 0 1 128 128v597.333334a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V213.333333a128 128 0 0 1 128-128h512z m0 64H256a64 64 0 0 0-64 64v597.333334a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V213.333333a64 64 0 0 0-64-64z"
                fill={fill || "#111111"}></path>
        </svg>
    )
}