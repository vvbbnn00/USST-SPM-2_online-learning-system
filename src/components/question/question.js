"use client";

import React from "react";
import SingleQuestion from "@/components/question/single";
import MultipleQuestion from "@/components/question/multiple";
import TextQuestion from "@/components/question/text";
import {IconDelete} from "@/components/icons/IconDelete";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

function DeleteConfirm({isOpen, questionId, onDelete, onOpenChange}) {
    const [isLoading, setIsLoading] = React.useState(false);

    return <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">确认</ModalHeader>
                    <ModalBody>
                        <p>
                            确认删除吗?
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="light" onPress={onClose}>
                            取消
                        </Button>
                        <Button
                            color="danger"
                            isLoading={isLoading}
                            onClick={
                                () => {
                                    setIsLoading(true);
                                    fetch(`/api/question/${questionId}`, {
                                        method: 'DELETE',
                                    }).then(r => {
                                        if (r.status === 200) {
                                            onDelete()
                                        }
                                    }).finally(() => {
                                        setIsLoading(false);
                                        onClose();
                                    })
                                }

                            }>
                            删除
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
}

export default function Question({questionDetail, onAnswerChange, index = null, onDelete = null, answer = null}) {
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = React.useState(false);

    const onAnswerChangeWrapper = (answer) => {
        if (!onAnswerChange) {
            return;
        }
        onAnswerChange({
            questionId: questionDetail.question_id,
            answer: answer,
        });
    }

    return <div>
        {onDelete &&
            <DeleteConfirm
                isOpen={isDeleteConfirmOpen}
                questionId={questionDetail.question_id}
                onDelete={onDelete}
                onOpenChange={(open) => {
                    setIsDeleteConfirmOpen(open)
                }}
            />
        }
        <div className={"text-medium pb-2 select-none break-words"}>
            <b>{index !== null ? `${index + 1}. ` : null}</b>
            <span className={"inline"}>
                {questionDetail.question_content}
            </span>
            <span className={"text-gray-600 text-sm pl-1.5 inline"}>
                {questionDetail.percentage}分
            </span>
            {
                onDelete &&
                <span className="text-lg text-danger cursor-pointer active:opacity-50 inline pl-1.5" onClick={
                    () => {
                        setIsDeleteConfirmOpen(true)
                    }
                }>
                    <IconDelete/>
                </span>
            }
        </div>
        {/*这里需要获取value 下面这个是用的之前的*/}
        {
            (questionDetail?.question_option?.type === 'single') &&
            <SingleQuestion options={questionDetail.question_option.options}
                            answer={answer}
                            onAnswerChange={onAnswerChangeWrapper}
            />
        }
        {
            (questionDetail?.question_option?.type === 'multiple') &&
            <MultipleQuestion options={questionDetail.question_option.options}
                              answer={answer}
                              onAnswerChange={onAnswerChangeWrapper}
            />
        }
        {
            (questionDetail?.question_option?.type === 'text') &&
            <TextQuestion options={questionDetail.question_option.options}
                          answer={answer}
                          onAnswerChange={onAnswerChangeWrapper}
            />
        }
        {
            questionDetail?.question_option?.answer &&
            <div>
                <div className={"text-sm pt-2 text-green-800"}>
                    <b>参考答案：</b>
                    {questionDetail.question_option.type === 'multiple' ? questionDetail.question_option.answer.split(",").map((item, index) => {
                        return <span key={index}>{questionDetail.question_option.options[parseInt(item)]}; </span>
                    }) : null}
                    {questionDetail.question_option.type === 'single' ? questionDetail.question_option.options[questionDetail.question_option.answer] : null}
                    {questionDetail.question_option.type === 'text' ? questionDetail.question_option.answer : null}
                </div>
            </div>
        }
    </div>
}
