import {Textarea} from "@nextui-org/react";
import {useEffect} from "react";
import React from "react";

export default function TextQuestion({options, answer, onAnswerChange}) {
    const [answerText, setAnswerText] = React.useState();

    useEffect(() => {
        if (!answer) {
            return;
        }
        setAnswerText(answer);
    }, [answer]);

    return <>
        <Textarea
            label={"答案"}
            className={"mr-2.5"}
            size={"md"}
            type={"text"}
            minLength={1}
            maxLength={2000}
            value={answerText}
            onChange={(e) => {
                setAnswerText(e.target.value);
            }}
            onBlur={(e) => {
                if (onAnswerChange) {
                    onAnswerChange(e.target.value);
                }
            }}
        />
    </>
}
