import {Input, Textarea} from "@nextui-org/react";
import React from "react";

export default function TextEdit({questionOption, onOptionChange}) {
    const [answer, setAnswer] = React.useState(questionOption?.answer);

    React.useEffect(() => {
        onOptionChange({
            answer: answer,
            option: null,
            type: "text"
        })
    }, [answer]);

    return <div className={"flex justify-center w-full pb-5"}>
        <div className={"w-[800px] flex flex-col gap-5"}>
            <Textarea
                label={"参考答案"}
                isRequired
                type={"text"}
                minLength={1}
                maxLength={2000}
                value={answer}
                onChange={(e) => {
                    const value = e.target.value;
                    setAnswer(value)
                }}
            />
        </div>
    </div>
}
