import { create } from 'zustand';

interface HeartStoreProps {
  isActiveHeart: Record<string, boolean>;
  setIsActiveHeart: (userName: string, isActiveHeart: boolean) => void;
}

export const useHeartStore = create<HeartStoreProps>(set => ({
  isActiveHeart: {},
  setIsActiveHeart: (userName: string, isActiveHeart: boolean) =>
    set(state => ({
      isActiveHeart: {
        ...state.isActiveHeart,
        [userName]: isActiveHeart,
      },
    })),
}));
