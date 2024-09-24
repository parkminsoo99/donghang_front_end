import { create } from 'zustand';

interface MenuProps {
  anchorEl: { [key: string]: HTMLElement | null };
  setAnchorEl: (
    key: string,
    event: React.MouseEvent<HTMLButtonElement> | null
  ) => void;
}

export const useMenuStore = create<MenuProps>(set => ({
  anchorEl: {},
  setAnchorEl: (
    key: string,
    event: React.MouseEvent<HTMLButtonElement> | null
  ) =>
    set(state => ({
      anchorEl: {
        ...state.anchorEl,
        [key]: event?.currentTarget,
      },
    })),
}));
