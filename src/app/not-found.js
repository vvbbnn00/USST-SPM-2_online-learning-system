import NavBarComp from "@/components/layout/navbar";
import Link from 'next/link'
import React from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useRouter } from 'next/navigation'



export default function NotFound() {
    return (<>
        <title>SPM2 - Not Found</title>
        <NavBarComp route={"/"} />
        {/* https://stackoverflow.com/questions/72673561/tailwind-h-screen-container-is-header-amount-of-height-too-far-off-the-bottom */}
        <div className="p-36 px-72 h-screen">
            <font size={4} color="#000000">
                <p style={{ fontSize: "100pt", margin: 0, paddingBottom: "20pt" }}>:(</p>
                <p style={{ fontSize: "20pt", margin: 0, padding: 0 }}>
                    你所请求的页面并不存在
                </p>
                <br />
                <Button
                    href={"/"}
                    variant={"faded"}
                >
                    <Link href="/">&lt; 返回</Link>
                </Button>
                <br />
                <br className="p-20" />
                <div>
                    <p>
                        <br />
                        错误详细信息
                        <br />
                        ERROR CODE: 404
                    </p>
                </div>
            </font>
        </div>
        <font size={4} color="#FFFFFF"></font>
    </>


    )
}