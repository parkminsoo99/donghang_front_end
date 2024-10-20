import { create } from 'zustand';

interface MapIsVideoListLoadProps {
  isVideo: boolean;
  setIsVideo: () => void;
}
export const useMapIsVideoListLoad = create<MapIsVideoListLoadProps>(
  (set, get) => ({
    isVideo: true,
    setIsVideo: () => set(() => ({ isVideo: !get().isVideo })),
  })
);
