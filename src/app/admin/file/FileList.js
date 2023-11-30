"use client"
import React, { useState } from 'react';
import {IconFileDelete} from "@/components/icons/file/IconFileDelete";
import {IconFileExcel} from "@/components/icons/file/IconFileExcel";
import {IconFileImage} from "@/components/icons/file/IconFileImage";
import {IconFilePdf} from "@/components/icons/file/IconFilePdf";
import {IconFileVideo} from "@/components/icons/file/IconFileVideo";
import {IconFileWord} from "@/components/icons/file/IconFileWord";
import {IconFileZip} from "@/components/icons/file/IconFileZip";
import {IconFileDownload} from "@/components/icons/file/IconFileDownload";

function FileList({ fileDataList }) {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(fileDataList.length / itemsPerPage);
    const currentItems = fileDataList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className="space-y-6">
            {currentItems.map((fileData, index) => (
                <div key={index} className="flex justify-between">
                    <div className="inline-flex">
                        {(() => {
                            switch (fileData.type) {
                                case 'pdf':
                                    return <IconFilePdf />;
                                case 'doc':
                                    return <IconFileWord />;
                                case 'mp4':
                                    return <IconFileVideo />;
                                case 'png':
                                    return <IconFileImage />;
                                case 'xls':
                                    return <IconFileExcel />;
                                case 'zip':
                                    return <IconFileZip />;
                                default:
                                    return null;
                            }
                        })()}
                    </div>
                    <p className="inline-flex">{fileData.name}</p>
                    <p className="inline-flex">{fileData.size}</p>
                    <p className="inline-flex">{fileData.create_time.toString()}</p>
                    <p className="inline-flex">{fileData.create_by}</p>
                    <div className="inline-flex">
                        <IconFileDownload />
                        <IconFileDelete />
                    </div>
                </div>
            ))}
            <div className="flex space-x-2">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 0}>
                    上一页
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => setCurrentPage(index)}>
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= totalPages - 1}>
                    下一页
                </button>
            </div>
        </div>
    );
}

export default FileList;