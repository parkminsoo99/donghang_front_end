import { create } from 'zustand';

interface UserInfoProps {
  email: string;
  name: string;
  nickname: string;
  setEmail: (inputEmail: string) => void;
  setName: (inputName: string) => void;
  setNickName: (inputNickname: string) => void;
}
export const useUserInfoStore = create<UserInfoProps>(set => ({
  email: '',
  name: '',
  nickname: '',
  setEmail: inputEmail => set(() => ({ email: inputEmail })),
  setName: inputName => set(() => ({ name: inputName })),
  setNickName: inputNickname => set(() => ({ nickname: inputNickname })),
}));
