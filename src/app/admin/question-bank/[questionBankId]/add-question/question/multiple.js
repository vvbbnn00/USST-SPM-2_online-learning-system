import {Checkbox, CheckboxGroup, Radio, RadioGroup} from "@nextui-org/react";
import React from "react";

export default function MultipleQuestion({options, answer, onAnswerChange}) {
    const [singleChoice, setSingleChoice] = React.useState(answer.split(",") || null);
    const [selectionList, setSelectionList] = React.useState(options.map((item, index) => ({
        label: index,
        value: index,
        input: item
    })));

    return <>
        <CheckboxGroup
            onValueChange={setSingleChoice}
        >
            {selectionList.map((item, index) => (
                <div className={"flex"} key={index}>
                    <Checkbox
                        value={item.value}
                        name={"question_option"}
                    >
                        <div className={"text-sm"}>
                            {item.input}
                        </div>
                    </Checkbox>
                </div>
            ))}
        </CheckboxGroup>
    </>
}
