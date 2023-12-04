import {Checkbox, CheckboxGroup, Radio, RadioGroup} from "@nextui-org/react";
import React, {useEffect} from "react";

export default function MultipleQuestion({options, answer, onAnswerChange}) {
    const [singleChoice, setSingleChoice] = React.useState();
    const [selectionList, setSelectionList] = React.useState(options.map((item, index) => ({
        label: index,
        value: index,
        input: item
    })));

    useEffect(() => {
        if (answer) {
            const answerSet = (new Set(answer.split(",")
                .map(item => parseInt(item))
                .filter(item => !isNaN(item))
                .sort()));
            setSingleChoice([...answerSet])
        }
    }, [answer]);

    return <>
        <CheckboxGroup
            value={singleChoice}
            onValueChange={(data)=>{
                setSingleChoice(data);
                const answer = data.sort().join(",");
                onAnswerChange(answer);
            }}
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
