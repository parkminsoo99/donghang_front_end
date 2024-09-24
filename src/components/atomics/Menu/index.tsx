import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useMenuStore } from '@/zustand/MenuStore/MenuStore';
import React, { ReactNode, useRef } from 'react';
import styled from 'styled-components';
const MenuItemContainer = styled(MenuItem)<{ size?: number }>`
  width: ${props => `${props.size}px` || '150px'};
`;

interface MenuProps {
  titleArray: string[] | JSX.Element[] | ReactNode[];
  size?: number;
  menuKey: string;
}

export const CustomMenu = ({ titleArray, size, menuKey }: MenuProps) => {
  const { anchorEl, setAnchorEl } = useMenuStore();
  console.log('anchorEl[menuKey]', anchorEl[menuKey]);
  const open = Boolean(anchorEl[menuKey]);
  const handleClose = () => {
    setAnchorEl(menuKey, null);
  };

  return (
    <Menu
      id={`menu-${menuKey}`}
      anchorEl={anchorEl[menuKey]}
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
      {titleArray.map((item, index) => (
        <MenuItemContainer
          key={`${item}-${index}`}
          onClick={handleClose}
          size={size}
        >
          {item}
        </MenuItemContainer>
      ))}
    </Menu>
  );
};
