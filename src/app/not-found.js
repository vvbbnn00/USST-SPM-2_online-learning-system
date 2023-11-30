'use client';
import Link from 'next/link'
import React from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useRouter } from 'next/navigation'



export default function NotFound() {
    const { asPath } = useRouter()
    return (<>
        <title>SPM2 - Not Found</title>
        {/* https://stackoverflow.com/questions/72673561/tailwind-h-screen-container-is-header-amount-of-height-too-far-off-the-bottom */}
        <div className="p-24 h-screen" style={{ backgroundColor: "#87CEEB" }}>
            <font size={4} color="#FFFFFF">
                <p style={{ fontSize: "100pt", margin: 0, paddingBottom: "20pt" }}>:(</p>
                <p style={{ fontSize: "20pt", margin: 0, padding: 0 }}>
                    你所请求的页面并不存在
                    <br />
                    你可以将下方的详细信息上报给我们
                </p>
                <br />
                <Button color="default" variant="light">
                    <font size={4} color="#FFFFFF"><Link href="/">返回首页</Link></font>
                </Button>
                <br />
                <br className="p-20"/>
                <div>
                    <p>
                        <br />
                        错误详细信息
                        <br />
                        网页路由: {asPath}
                    </p>
                </div>
            </font>
        </div>
        <font size={4} color="#FFFFFF"></font>
    </>


    )
}