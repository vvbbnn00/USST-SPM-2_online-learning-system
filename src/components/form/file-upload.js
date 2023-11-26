"use client"

import {Button, Progress} from "@nextui-org/react";
import FileIconRounded from "@/components/layout/file-icon-rounded";
import React from "react";
import {parseSize} from "@/utils/string";
import {redirect} from "next/navigation";

export default function FileUpload({onUploaded, defaultFile}) {

    const fileUploadRef = React.useRef(null);
    const [file, setFile] = React.useState(defaultFile || null);
    const [fileExtension, setFileExtension] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [error, setError] = React.useState(null);
    const setFileUploadId = onUploaded || ((uploadId) => {
        console.warn("No onUploaded callback provided, uploadId: ", uploadId);
    })
    const [uploadSuccess, setUploadSuccess] = React.useState(!!defaultFile);

    React.useEffect(() => {
        if (file) {
            const exts = file.name.split(".");
            setFileExtension(exts[exts.length - 1]);
        }
    }, [file]);

    const getUploadUrl = async () => {
        try {
            const exts = file.name.split(".");
            const ext = exts[exts.length - 1].length < 20 ? exts[exts.length - 1] : "unknown";
            const res = await fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({
                    fileName: file.name.length < 255 ? file.name : "filename_too_long" + "." + ext,
                    fileSize: file.size,
                    fileType: ext
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await res.json();
            return {
                uploadId: json.uploadId,
                uploadUrl: json.uploadUrl
            };
        } catch (e) {
            if (e.code === 401) {
                redirect("/login");
            }
            return null;
        }
    }

    const reportUploadUrl = async (uploadId, fileId) => {
        try {
            const result = await fetch(`/api/upload/${uploadId}`, {
                method: "POST",
                body: JSON.stringify({
                    storageId: fileId
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return result.status === 200;
        } catch (e) {
            if (e.code === 401) {
                redirect("/login");
            }
            return false;
        }
    }

    const doUpload = async () => {
        setError(null);
        setUploading(true);
        setUploadSuccess(false);

        try {
            const {uploadId, uploadUrl} = await getUploadUrl();
            if (!uploadUrl) {
                throw new Error("无法获取上传链接");
            }

            const fileBlob = new Blob([file]);
            const form = new FormData();
            form.append("file", fileBlob);

            const xhr = new XMLHttpRequest();
            xhr.open("POST", uploadUrl, true);

            xhr.upload.onprogress = e => {
                setUploadProgress(e.loaded / e.total * 100);
            }

            xhr.onload = async () => {
                if (xhr.status === 200) {
                    const reportStatus = await reportUploadUrl(uploadId, xhr.response.trim());
                    if (!reportStatus) {
                        setError("上传失败，无法上报文件信息");
                        setUploading(false);
                        setUploadProgress(0);
                        return;
                    } else {
                        setFileUploadId(uploadId);
                        setError(null);
                        setUploadSuccess(true);
                    }
                } else {
                    setError(`上传失败，错误码[${xhr.status}]`);
                }
                setUploading(false);
                setUploadProgress(0);
            };

            xhr.onerror = () => {
                setError("上传过程中出现错误");
                setUploading(false);
                setUploadProgress(0);
            };

            xhr.send(form);
        } catch (error) {
            setError(error.message);
            setUploading(false);
            setUploadProgress(0);
        }
    };

    return <div>
        <div
            className={"flex flex-col gap-3 p-5 border-2 border-gray-50 rounded shadow hover:shadow-xl transition cursor-pointer"}
            ref={fileUploadRef}
            onDragOver={e => {
                e.preventDefault();
                e.stopPropagation();
                fileUploadRef.current.classList.add("border-gray-600");
            }}
            onDragLeave={e => {
                e.preventDefault();
                e.stopPropagation();
                fileUploadRef.current.classList.remove("border-gray-600");
            }}
            onDrop={e => {
                e.preventDefault();
                e.stopPropagation();
                fileUploadRef.current.classList.remove("border-gray-600");

                if (uploading) return;

                setUploadSuccess(false);
                setFile(e.dataTransfer.files[0]);
            }}
            onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                fileUploadRef.current.classList.remove("border-gray-600");

                if (uploading) return;

                const uploadInput = document.createElement("input");
                uploadInput.type = "file";
                uploadInput.accept = "*/*";
                uploadInput.onchange = e => {
                    setUploadSuccess(false);
                    setFile(e.target.files[0]);
                    uploadInput.remove();
                }
                uploadInput.oncancel = e => {
                    uploadInput.remove();
                }
                uploadInput.click();
            }}
        >
            <div className={"flex transition-all items-center"}>
                <div className={"flex select-none"}>
                    <FileIconRounded type={file ? fileExtension : "file"} size={48}/>
                </div>
                <div className={"flex-1 text-center mt-4 select-none"}>
                    <div
                        className={"text-lg font-bold text-gray-600"}>{file ? file.name : "拖拽文件到此处，或者点击上传"}</div>
                    <div className={"text-sm text-gray-500"}>{parseSize(file ? file.size : 0)}</div>
                </div>

                {
                    (file && !uploadSuccess) && <div className={"flex justify-center items-center"}>
                        <div
                            className={"flex gap-2.5 items-center justify-end overflow-hidden transition-all animate-appearance-in"}>
                            <Button
                                className={"rounded text-sm transition-all"}
                                onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    if (uploading) return;
                                    if (!file) return;

                                    doUpload();
                                }}
                                isLoading={uploading}
                            >
                                上传
                            </Button>
                        </div>
                    </div>
                }
            </div>
            {
                uploading &&
                <Progress aria-label="Uploading..." value={uploadProgress} className="max-w-md" size="sm"/>
            }
        </div>
        {error && (<div
            className={"bg-red-50 border border-red-200 text-red-500 p-2.5 rounded text-sm text-center mt-2.5"}
        >
            上传失败，错误原因：{error}
        </div>)}
        {uploadSuccess && (<div
            className={"bg-green-50 border border-green-200 text-green-500 p-2.5 rounded text-sm text-center mt-2.5"}
        >
            上传成功
        </div>)}
    </div>
}
