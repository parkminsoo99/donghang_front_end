import { cloneElement, FC, ReactNode } from 'react';
import { Modal } from 'antd';
import { useModalStore } from '@/zustand/modalStore/modalStore';

interface ModalProps {
  title: string;
  content: JSX.Element;
  children?: ReactNode;
  buttonTrigger: JSX.Element;
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
      {cloneElement(buttonTrigger, {
        onClick: () => openModal(content),
      })}
      <Modal
        title={title}
        open={isModalOpen}
        onCancel={closeModal}
        footer={[<button key="submit">test</button>]}
      >
        {contentModal}
      </Modal>
    </>
  );
};
