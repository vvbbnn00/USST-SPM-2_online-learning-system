import {Textarea} from "@nextui-org/react";

export default function TextQuestion({options, answer, onAnswerChange}) {

    return <>
        <Textarea
            label={"答案"}
            className={"mr-2.5"}
            size={"md"}
            type={"text"}
            minLength={1}
            maxLength={2000}
            defaultValue={answer}
        />
    </>
}
