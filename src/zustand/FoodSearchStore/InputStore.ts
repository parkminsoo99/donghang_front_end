import { create } from 'zustand';

interface InputStoreProps {
  userInput: any[];
  setUserInput: (userInput: any[]) => void;
}
export const useSearchInputStore = create<InputStoreProps>(set => ({
  userInput: [],
  setUserInput: userInput => set(() => ({ userInput: userInput })),
}));
