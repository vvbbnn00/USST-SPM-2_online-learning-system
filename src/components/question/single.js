import {Radio, RadioGroup} from "@nextui-org/react";
import React, {useEffect} from "react";

export default function SingleQuestion({options, answer, onAnswerChange}) {
    const [singleChoice, setSingleChoice] = React.useState(null);
    const [selectionList, setSelectionList] = React.useState(options.map((item, index) => ({
        label: index,
        value: index,
        input: item
    })));

    useEffect(() => {
        answer = parseInt(answer);
        if (isNaN(answer)) {
            return;
        }
        setSingleChoice(answer);
    }, [answer]);

    return <>
        <RadioGroup
            value={singleChoice}
            onValueChange={(data) => {
                setSingleChoice(data);
                onAnswerChange(data);
            }}
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
