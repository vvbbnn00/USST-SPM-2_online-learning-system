"use client"
import { useState } from 'react';

export default function FileTypeDropdown() {
    const [selectedFileType, setSelectedFileType] = useState('文件类型');

    const fileTypes = ['图片', '视频', '文档', '音频', '其他'];

    return (
        <select
            value={selectedFileType}
            onChange={(e) => setSelectedFileType(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
        >
            {fileTypes.map((type) => (
                <option key={type} value={type}>
                    {type}
                </option>
            ))}
        </select>
    );
}