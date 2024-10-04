import { create } from 'zustand';

interface IsMapClickProps {
  isMapClick: boolean;
  setIsMapClick: () => void;
}
export const useIsMapClick = create<IsMapClickProps>((set, get) => ({
  isMapClick: false,
  setIsMapClick: () => set(() => ({ isMapClick: !get().isMapClick })),
}));
