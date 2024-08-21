import { create } from 'zustand';

interface DistanceProps {
  distanceValue: number;
  setDistanceValue: (value: number) => void;
}
export const DistanceStore = create<DistanceProps>(set => ({
  distanceValue: 0.5,
  setDistanceValue: (value: number) => set(() => ({ distanceValue: value })),
}));
