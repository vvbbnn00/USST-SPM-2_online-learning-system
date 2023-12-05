"use client"
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import React, {useEffect} from "react";
import {useFormState, useFormStatus} from "react-dom";
import {doStudentSubmit} from "@/app/exam/[examId]/action";

function DoSubmitButton() {
    const {pending} = useFormStatus();

    return <Button
        color={"primary"}
        isLoading={pending}
        type={"submit"}
    >
        交卷
    </Button>
}

export default function SubmitButton({examId}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [state, formAction] = useFormState(doStudentSubmit, {});

    const onOpenChange = (open) => {
        setIsOpen(open)
    }

    useEffect(() => {
        if (state?.code === 200) {
            location.href = `/exam`
        }
    }, [state]);

    return <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader className="flex flex-col gap-1">确认交卷</ModalHeader>
                    <ModalBody>
                        <p>
                            交卷后将无法再次答题，确认交卷吗?
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="light" onPress={onClose}>
                            取消
                        </Button>
                        <form action={formAction}>
                            <input defaultValue={examId} name={"examId"} type={"hidden"}/>
                            <DoSubmitButton/>
                        </form>
                    </ModalFooter>
                </>)}
            </ModalContent>
        </Modal>
        <Button
            color={"primary"}
            onClick={() => {
                setIsOpen(true)
            }}
        >
            交卷
        </Button>
    </>
}
