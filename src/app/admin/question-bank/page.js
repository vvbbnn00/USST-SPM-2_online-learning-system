import NavBarComp from "@/components/layout/navbar";
import React from "react";
import QuestionBankSearchbar from "@/app/admin/question-bank/question-bank-searchbar";
import QuestionBankTable from "@/app/admin/question-bank/question-bank-table";
import {getQuestionBankTotal, searchQuestionBankList} from "@/service/question-bank";
import {isTeacher} from "@/utils/auth";
import {notFound} from "next/navigation";

export default async function Questions({searchParams}) {
    if (!await isTeacher()) {
        return notFound();
    }

    let {page, kw, status} = searchParams
    page = Number(page) || 1;
    status = status || null;

    const pagesDefault = {
        page: page,
        pageSize: 10,
    }
    const total = await getQuestionBankTotal({
        kw: kw,
        status: status
    });

    const questionBankList = await searchQuestionBankList({
        kw: kw,
        status: status,
        page: pagesDefault.page,
        pageSize: pagesDefault.pageSize
    });

    const pages = {
        totalPages: Math.ceil(total / pagesDefault.pageSize) || 1,
        current: 1,
    }

    return (
        <>
            <NavBarComp route={"/admin/question-bank"}/>
            <div className={""}>
                <div className={"flex justify-center"}>
                    <div className={"w-[1024px] p-5 mt-5"}>
                        <div className={"flex flex-row w-full bg-white rounded-lg shadow-xl p-7"}>
                            <QuestionBankSearchbar/>
                        </div>
                    </div>
                </div>
                <div className={"w-full"}>
                    <QuestionBankTable questionBankList={questionBankList} pages={pages}/>
                </div>
            </div>
        </>
    )
}
