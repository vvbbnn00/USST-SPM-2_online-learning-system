"use client"
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {IconDelete} from "@/components/icons/IconDelete";
import React from "react";

export default function DeleteConfirm({userId, children}) {

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
                                fetch(`/api/user/${userId}`, {
                                    method: 'DELETE',
                                }).then(async r => {
                                    if (r.status === 200) {
                                        location.href = "/admin/user"
                                    }
                                    if (r.status !== 200) {
                                        alert(`删除失败: ${(await r.json()).message}`)
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
        <div onClick={() => {
            setIsOpen(true)
        }}>
            {children ? children : <Button
                color={"danger"}
                variant={"flat"}
                startContent={<div className={"text-red-500"}><IconDelete/></div>}
                onClick={() => {
                    setIsOpen(true)
                }}
            >
                删除
            </Button>}
        </div>
    </>
}
