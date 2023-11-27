"use client";
import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import React, {useEffect} from "react";
import FileUpload from "@/components/form/file-upload";
import {formCreateContent} from "@/components/layout/content-form/actions";
import {useFormStatus, useFormState} from "react-dom";

const Submit = () => {
    const {pending} = useFormStatus();

    return <Button
        auto
        type={"submit"}
        color={"primary"}
        size={"lg"}
        className={"w-full"}
        isLoading={pending}
    >
        保存
    </Button>
}

export default function ContentForm({content}) {

    const [uploadId, setUploadId] = React.useState(content?.contentFile?.fileId || "");
    const [state, formAction] = useFormState(formCreateContent, {});

    if (content?.contentFile) {
        content.file = {
            name: content.contentFile.fileName,
            size: content.contentFile.fileSize,
        }
    }

    useEffect(() => {
        if (state?.code === 200) {
            location.href = `/content/${state?.contentId}`;
        }
    }, [state]);

    return <div className={"w-[500px]"}>
        <form className={"flex flex-col gap-5"} action={formAction}>

            {(state?.code && state?.code !== 200) &&
                <div className={"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"}
                     role="alert">
                    <strong className={"font-bold"}>
                        {content ? "更新" : "创建"}失败：
                    </strong>
                    <span className={"block sm:inline"}>{state?.message}</span>
                </div>
            }

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
                minLength={1}
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
                <Submit/>
            </div>
        </form>
    </div>
}
