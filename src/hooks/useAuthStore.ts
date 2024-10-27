import { useState, useEffect } from 'react';
import { useAuthStore } from '@/zustand/LoginStore/loginStore';

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
