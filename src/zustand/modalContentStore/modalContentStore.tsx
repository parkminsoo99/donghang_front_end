import { create } from 'zustand';

interface ModalContentStoreProps {
  Content: JSX.Element[];
  ContentArray: (argContents: JSX.Element[]) => void;
}

export const useModalContentStore = create<ModalContentStoreProps>(set => ({
  Content: [],
  ContentArray: (argContents: JSX.Element[]) =>
    set(state => ({ Content: argContents })),
}));
