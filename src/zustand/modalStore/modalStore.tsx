import { create } from 'zustand';
import { useModalContentStore } from '../modalContentStore/modalContentStore';

interface ModalStoreProps {
  uniqueModal: string;
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: (content: JSX.Element[], index: number) => void;
  contentModal: JSX.Element | null;
  setUniqueModal: (uniqueModalString: string) => void;
  setContentIndex: () => number;
  contentIndex: number;
  nextContent: (index: number) => void;
}

export const useModalStore = create<ModalStoreProps>((set, get) => ({
  uniqueModal: '',
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
  setUniqueModal: (uniqueModalString: string) =>
    set(() => ({
      uniqueModal: uniqueModalString,
    })),
  setContentIndex: () => {
    const newIndex = get().contentIndex + 1;
    set(() => ({ contentIndex: newIndex }));
    return newIndex;
  },
}));
