"use client"

import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem} from "@nextui-org/react";
import {IconChevronDown} from "@/component/icons/IconChevronDown";

export function AdminNavBarItem({route}) {
    const currentRoute = route || "/";

    return (
        <Dropdown>
            <NavbarItem isActive={
                currentRoute.startsWith("/admin")
            }>
                <DropdownTrigger>
                    <div className={"cursor-pointer flex items-center"}>
                        <div>管理</div>
                        <div className={"ml-1.5"}>
                            <IconChevronDown fill="currentColor" size={16}/>
                        </div>
                    </div>
                </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
                aria-label="Admin"
                itemClasses={{
                    base: "gap-4",
                }}
                selectionMode="single"
                selectedKeys={[route]}
            >
                <DropdownItem
                    key="/admin/user"
                    description="对课程用户进行管理。"
                >
                    用户管理
                </DropdownItem>
                <DropdownItem
                    key="/admin/question"
                    description="可查看题库中的题目。"
                >
                    题库管理
                </DropdownItem>
                <DropdownItem
                    key="/admin/file"
                    description="上传、下载、删除文件。"
                >
                    文件管理
                </DropdownItem>
                <DropdownItem
                    key="/admin/system"
                    description="编辑系统信息和课程信息。"
                >
                    系统管理
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
