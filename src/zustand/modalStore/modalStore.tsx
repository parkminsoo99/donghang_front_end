import { create } from 'zustand';

interface ModalStoreProps {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: (content: JSX.Element) => void;
  contentModal: JSX.Element | null;
}

export const useModalStore = create<ModalStoreProps>(set => ({
  isModalOpen: false,
  closeModal: () =>
    set(state => ({ isModalOpen: !state.isModalOpen, contentModal: null })),
  openModal: (content: JSX.Element) =>
    set(state => ({ isModalOpen: !state.isModalOpen, contentModal: content })),
  contentModal: null,
}));
