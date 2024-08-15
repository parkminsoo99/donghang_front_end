import { cloneElement, FC, ReactNode } from 'react';
import { Modal, Flex } from 'antd';
import { useModalStore } from '@/zustand/modalStore/modalStore';

interface ModalProps {
  title?: string;
  content: JSX.Element;
  children?: ReactNode;
  buttonTrigger?: JSX.Element;
}
export const CustomModal: FC<ModalProps> = ({
  buttonTrigger,
  title,
  content,
  children,
}: ModalProps) => {
  const { isModalOpen, contentModal, openModal, closeModal } = useModalStore();

  return (
    <>
      {buttonTrigger &&
        cloneElement(buttonTrigger, {
          onClick: () => openModal(content),
        })}
      <Modal
        styles={{ body: { height: '600px' } }}
        width={640}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        {title}
        <Flex align="center" justify="center">
          {contentModal}
        </Flex>
      </Modal>
    </>
  );
};
