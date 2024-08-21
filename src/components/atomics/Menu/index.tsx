import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuStore } from '@/zustand/MenuStore/MenuStore';
import { ReactNode } from 'react';
import styled from 'styled-components';

const MenuItemContainer = styled(MenuItem)<{ size?: number }>`
  width: ${props => `${props.size}px` || '150px'};
`;

interface MenuProps {
  titleArray: string[] | JSX.Element[] | ReactNode[];
  size?: number;
}

export const CustomMenu = ({ titleArray, size }: MenuProps) => {
  const { anchorEl, setAnchorEl } = MenuStore();
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      {titleArray.map((key, index) => (
        <MenuItemContainer
          key={`${key}-${index}`}
          onClick={handleClose}
          size={size}
        >
          {key}
        </MenuItemContainer>
      ))}
    </Menu>
  );
};
