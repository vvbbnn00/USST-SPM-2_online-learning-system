"use client"

import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem, User} from "@nextui-org/react";
import {IconChevronDown} from "@/components/icons/IconChevronDown";
import React from "react";
import {IconPersonInfo} from "@/components/icons/IconPersonInfo";
import {IconLogout} from "@/components/icons/IconLogout";

export function UserNavBarItem({route, userData}) {
    const currentRoute = route || "/";

    return (
        <Dropdown>
            <DropdownTrigger>
                <div className={"cursor-pointer flex items-center"}>
                    <div>
                        <User
                            name={userData.name}
                            avatarProps={{src: userData.avatar}}
                            description={userData.username}
                        />
                    </div>
                    <div className={"ml-1.5"}>
                        <IconChevronDown fill="currentColor" size={16}/>
                    </div>
                </div>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="User"
                itemClasses={{
                    base: "gap-4",
                }}
                selectionMode="single"
                selectedKeys={[route]}
            >
                <DropdownItem
                    key="/user/profile"
                    description="查看个人信息，修改密码。"
                    showDivider={true}
                    startContent={<IconPersonInfo size={48}/>}
                    href={"/user/profile"}
                >
                    个人信息
                </DropdownItem>
                <DropdownItem
                    key="/logout"
                    color={"danger"}
                    variant={"flat"}
                    className="text-danger"
                    startContent={<IconLogout size={20} fill={"#f31260"}/>}
                    href={"/logout"}
                >
                    登出
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
