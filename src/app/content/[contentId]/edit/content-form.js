"use client";
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import React from "react";
import FileUpload from "@/components/form/file-upload";

export default function ContentForm({content}) {

    const [uploadId, setUploadId] = React.useState("");

    if (content?.contentFile) {
        content.file = {
            name: content.contentFile.fileName,
            size: content.contentFile.fileSize,
        }
    }

    return <div className={"w-[500px]"}>
        <form className={"flex flex-col gap-5"}>
            <input name={"contentId"} type={"hidden"} value={content?.contentId}/>
            <Input
                label={"教学材料名称"}
                isRequired
                size={"lg"}
                type={"text"}
                name={"name"}
                minLength={1}
                maxLength={255}
                defaultValue={content?.contentName}
            />
            <Input
                label={"所属章节"}
                size={"lg"}
                type={"text"}
                name={"chapter"}
                minLength={0}
                maxLength={255}
                isRequired={true}
                defaultValue={content?.chapter}
            />
            <div>
                <FileUpload onUploaded={setUploadId} defaultFile={content?.file}/>
            </div>
            <input name={"uploadId"} type={"hidden"} value={uploadId} required/>
            <Select
                label="查阅权限"
                placeholder="设置教学材料的查阅权限"
                size={"lg"}
                isRequired
                name={"permission"}
                defaultSelectedKeys={[(content?.canDownload) ? "download" : "view"]}
            >
                <SelectItem value={"view"} key={"view"}>
                    {"仅允许查看"}
                </SelectItem>
                <SelectItem value={"download"} key={"download"}>
                    {"允许查看、下载"}
                </SelectItem>
            </Select>
            <div>
                <Input
                    type="number"
                    label="平时分占比"
                    placeholder="0.00"
                    size={"lg"}
                    isRequired
                    endContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">%</span>
                        </div>
                    }
                    min={0}
                    max={100}
                    step={0.01}
                    name={"percentage"}
                    defaultValue={content?.percentage}
                />
                <div className="text-default-500 text-small mt-1">
                    请合理分配平时分占比，平时分占比总和应为100%。
                </div>
            </div>

            <div>
                <Button
                    auto
                    type={"submit"}
                    color={"primary"}
                    size={"lg"}
                    className={"w-full"}
                >
                    保存
                </Button>
            </div>
        </form>
    </div>
}
