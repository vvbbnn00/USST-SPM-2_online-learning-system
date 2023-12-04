"use client"
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {IconDelete} from "@/components/icons/IconDelete";
import React from "react";

export default function DeleteConfirm({contentId}) {

    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    const onOpenChange = (open) => {
        setIsOpen(open)
    }

    return <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (<>
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
                            onClick={() => {
                                setIsLoading(true);
                                fetch(`/api/content/${contentId}`, {
                                    method: 'DELETE',
                                }).then(r => {
                                    if (r.status === 200) {
                                        location.href = "/content"
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
                </>)}
            </ModalContent>
        </Modal>
        <Button
            color={"danger"}
            variant={"flat"}
            startContent={<div className={"text-red-500"}><IconDelete/></div>}
            onClick={() => {
                setIsOpen(true)
            }}
        >
            删除
        </Button>
    </>
}
