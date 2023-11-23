"use server"
import {Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import React from "react";
import {isAdmin, isLogin} from "@/utils/auth";
import {AdminNavBarItem} from "@/component/layout/navbar/admin-dropdown-items";

export default async function NavBarComp({route}) {
    const siteName = "项目管理与过程改进";
    const currentRoute = route || "/";

    return (<>
        <Navbar>
            <NavbarContent>
                <NavbarBrand>
                    <p className="font-bold select-none">{siteName}</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="flex gap-4" justify="center">
                <NavbarItem isActive={
                    currentRoute === "/"
                }>
                    <Link color="foreground" href="/">
                        首页
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={
                    currentRoute === "/content"
                }>
                    <Link href="/content" aria-current="page">
                        学习内容
                    </Link>
                </NavbarItem>
                {
                    await isLogin() ? <>
                        <NavbarItem isActive={
                            currentRoute === "/exam"
                        }>
                            <Link color="foreground" href="#">
                                测试
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive={
                            currentRoute === "/grade"
                        }>
                            <Link color="foreground" href="#">
                                成绩
                            </Link>
                        </NavbarItem>
                    </> : <></>
                }
                {
                    await isAdmin() ? <>
                        <AdminNavBarItem route={route}/>
                    </> : <></>
                }
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="primary" href="/login">
                        登录
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    </>)
}
