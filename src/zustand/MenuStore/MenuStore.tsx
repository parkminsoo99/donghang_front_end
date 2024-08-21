import { create } from 'zustand';

interface MenuProps {
  anchorEl: null | HTMLElement;
  setAnchorEl: (event: React.MouseEvent<HTMLButtonElement> | null) => void;
}

export const MenuStore = create<MenuProps>(set => ({
  anchorEl: null,
  setAnchorEl: (event: React.MouseEvent<HTMLButtonElement> | null) =>
    set(state => ({ anchorEl: event?.currentTarget })),
}));
