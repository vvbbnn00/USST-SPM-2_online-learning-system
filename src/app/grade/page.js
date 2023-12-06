"use server"
import NavBarComp from "@/components/layout/navbar";
import React from "react";
import {getGradeList, getQueryExams} from "@/service/grade";
import GradeList from "@/app/grade/grade-table";
import {isLogin} from "@/utils/auth";
import {redirect} from "next/navigation";

export default async function Questions({searchParams}) {
    if (!await isLogin()) {
        return redirect('/login')
    }

    const examList = await getQueryExams();
    const gradeList = await getGradeList(examList);

    // console.log('Data received in the component:', gradeList);

    return (
        <>
            <NavBarComp route={"/grade"}/>
            <div className={""}>
                <div className={"w-full p-5 pt-10"}>
                    <GradeList gradeList={gradeList}
                               examList={examList}
                    />
                </div>
            </div>
        </>
    )
}
