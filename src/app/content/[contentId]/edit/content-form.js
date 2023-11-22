"use client";
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import React from "react";
import FileUpload from "@/component/form/file-upload";

export default function ContentForm() {

    const [uploadId, setUploadId] = React.useState("");

    return <div className={"w-[500px]"}>
        <form className={"flex flex-col gap-5"}>
            <Input
                label={"教学材料名称"}
                isRequired
                size={"lg"}
                type={"text"}
                name={"name"}
                minLength={1}
                maxLength={255}
            />
            <FileUpload onUploaded={setUploadId}/>
            <input name={"uploadId"} type={"hidden"} value={uploadId} required/>
            <Select
                label="查阅权限"
                placeholder="设置教学材料的查阅权限"
                size={"lg"}
                isRequired
                name={"permission"}
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
                    defaultValue={"0.00"}
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
