"use client"

import {Accordion, AccordionItem} from "@nextui-org/react";
import {ContentItem} from "@/app/content/content-item";

export default function ContentList({contentList}) {

    const chapterMap = {};
    contentList.forEach(item => {
        if (!chapterMap[item.chapter]) {
            chapterMap[item.chapter] = [];
        }
        chapterMap[item.chapter].push(item);
    })

    return (<>
        <Accordion
            variant="splitted"
            selectionMode="multiple"
            defaultSelectedKeys={"all"}
            itemClasses={{
            base: "mb-5",
        }}>
            {Object.keys(chapterMap).map((chapter, index) => {
                return <AccordionItem key={index.toString()} aria-label={`Accordion ${index}`} title={chapter}>
                    <div>
                        <div className={"flex pt-2.5 pb-2.5 flex-col gap-2"}>
                            {chapterMap[chapter].map(item => {
                                return <div key={item.content_id} className={"w-full"}>
                                    <ContentItem item={item}/>
                                </div>
                            })}
                        </div>
                    </div>
                </AccordionItem>
            })}
        </Accordion>
    </>)
}
