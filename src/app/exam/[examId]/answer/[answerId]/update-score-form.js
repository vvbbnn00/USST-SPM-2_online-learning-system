import {useFormState, useFormStatus} from "react-dom";
import {doUpdateScore} from "@/app/exam/[examId]/answer/[answerId]/actions";
import {useEffect} from "react";

function Submit() {
    const {pending} = useFormStatus();

    return <button
        type={"submit"}
        className={"ml-2 bg-black text-white rounded-md p-1.5 pl-2 pr-2 text-sm hover:opacity-80 active:opacity-100"}
        disabled={pending}
    >
        更新
    </button>
}

export default function UpdateScoreForm({questionId, answerId, score, maxScore, onChange}) {
    const [state, formAction] = useFormState(doUpdateScore, {});

    useEffect(() => {
        if (state?.code === 200) {
            onChange(state?.score);
        }
    }, [state]);

    return <div className={"flex p-5 pl-0 text-gray-600 items-center"}>
                                <span>
                                    得分
                                </span>
        <form className={"flex items-center"} action={formAction}>
            <input
                name={"answerId"}
                type={"hidden"}
                value={answerId}
            />
            <input
                name={"questionId"}
                type={"hidden"}
                value={questionId}
            />
            <input
                name={"score"}
                type={"number"}
                min={0}
                max={maxScore}
                step={1}
                defaultValue={score}
                className={"border border-gray-300 rounded-md p-0.5 pl-1.5 w-14 ml-2"}
            />
            <Submit/>
            {state?.code === 200 && <div className={"ml-2 text-green-800 text-sm"}>
                更新成功
            </div>}

            {state?.code && state?.code !== 200 && <div className={"ml-2 text-red-800 text-sm"}>
                更新失败: {state?.message}
            </div>}
        </form>
    </div>
}
