import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect, useState } from 'react';

interface AuthStore {
  userToken: string | null;
  setUserToken: (userToken: string) => void;
  logout: () => void;
}

// Zustand 스토어 정의
export const useAuthStore = create(
  persist<AuthStore>(
    set => ({
      userToken: null,
      setUserToken: (userToken: string) => set({ userToken }),
      logout: () => set({ userToken: null }),
    }),
    {
      name: 'userInfoStorage', // localStorage에 저장될 key 이름
    }
  )
);

// 클라이언트 환경에서만 상태를 가져오는 커스텀 훅
export const useClientAuthStore = () => {
  const [isClient, setIsClient] = useState(false);
  const authStore = useAuthStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient
    ? authStore
    : { userToken: null, setUserToken: () => {}, logout: () => {} };
};
