import { create } from 'zustand';
import { useModalContentStore } from '../modalContentStore/modalContentStore';

interface ModalStoreProps {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: (content: JSX.Element[], index: number) => void;
  contentModal: JSX.Element | null;
  setContentIndex: () => number;
  contentIndex: number;
  nextContent: (index: number) => void;
}

export const useModalStore = create<ModalStoreProps>((set, get) => ({
  isModalOpen: false,
  contentIndex: 0,
  contentModal: null,
  closeModal: () => set(() => ({ isModalOpen: false, contentModal: null })),
  openModal: (content, index) =>
    set(() => ({ isModalOpen: true, contentModal: content[index] })),
  nextContent: index => {
    const content = useModalContentStore.getState().Content[index];
    set(() => ({ contentModal: content }));
  },
  setContentIndex: () => {
    const newIndex = get().contentIndex + 1; // get()을 사용하여 현재 상태를 가져옴
    set(() => ({ contentIndex: newIndex }));
    return newIndex;
  },
}));
