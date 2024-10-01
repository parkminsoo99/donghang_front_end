import { create } from 'zustand';

interface InputStoreProps {
  userInput: string;
  setUserInput: (userInput: string) => void;
}
export const useSearchInputStore = create<InputStoreProps>(set => ({
  userInput: '',
  setUserInput: userInput => set(() => ({ userInput: userInput })),
}));
