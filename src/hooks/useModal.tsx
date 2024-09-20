import { cloneElement, FC, ReactNode } from 'react';
import { Modal, Flex } from 'antd';
import { useModalStore } from '@/zustand/modalStore/modalStore';

interface ModalProps {
  title?: string;
  content?: JSX.Element[];
  children?: ReactNode;
  buttonTrigger?: JSX.Element;
}

export const CustomModal: FC<ModalProps> = ({ title }) => {
  const { isModalOpen, contentModal, closeModal, uniqueModal } =
    useModalStore();

  return (
    <Modal
      styles={{ body: { height: '600px' } }}
      width={uniqueModal === 'Video' ? 940 : 640}
      open={isModalOpen}
      onCancel={closeModal}
      footer={null}
    >
      {title}
      <Flex align="center" justify="center">
        {contentModal}
      </Flex>
    </Modal>
  );
};
