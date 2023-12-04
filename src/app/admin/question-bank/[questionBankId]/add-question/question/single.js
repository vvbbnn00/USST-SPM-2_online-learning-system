import {Radio, RadioGroup} from "@nextui-org/react";
import React from "react";

export default function SingleQuestion({options, answer, onAnswerChange}) {
    answer = parseInt(answer);
    if (isNaN(answer)) {
        answer = null;
    }

    const [singleChoice, setSingleChoice] = React.useState(answer);
    const [selectionList, setSelectionList] = React.useState(options.map((item, index) => ({
        label: index,
        value: index,
        input: item
    })));

    return <>
        <RadioGroup
            value={singleChoice}
            onValueChange={setSingleChoice}
        >
            {selectionList.map((item, index) => (
                <div className={"flex"} key={index}>
                    <Radio
                        value={item.value}
                        name={"question_option"}
                    >
                        <div className={"text-sm"}>
                            {item.input}
                        </div>
                    </Radio>
                </div>
            ))}
        </RadioGroup>
    </>
}
