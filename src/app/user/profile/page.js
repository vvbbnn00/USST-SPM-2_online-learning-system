import NavBarComp from "@/components/layout/navbar";
import {getUserData} from "@/utils/auth";
import React from "react";
import ProfileForm from "@/app/user/profile/profile-form";

export default async function UserProfile() {

    const UserData = await getUserData();

    return(
        <>
            <NavBarComp route={"/user/profile"}/>

            <div className={"flex justify-center"}>
                <div className={"w-[1024px]"}>
                    <div className={"pt-10 pb-2.5"}>

                        <div className={"flex bg-white p-5 rounded-xl shadow-xl"}>

                            <div className={"flex flex-1 justify-center p-1.5"}>
                                <div className={"flex gap-2.5 items-center"}>
                                    <span className={"text-gray-950 font-bold text-xl"}>编辑个人信息</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={"flex bg-white p-10 rounded-xl shadow-xl mt-5 flex-col gap-5 w-full"}>
                        <div className={"w-full justify-center flex"}>
                            <ProfileForm userdata={UserData}/>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}