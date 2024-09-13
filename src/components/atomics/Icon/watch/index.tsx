'use client';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import styled from 'styled-components';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const IconSizeContainer = styled.button`
  border-color: none;
  justify-content: center;
  align-items: center;
  background-color: none;
  border: 0;
  cursor: pointer;
  box-sizing: content-box;
  background: none;
  padding: 0;
`;

interface AccountProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: number;
}

export const WatchIcon = ({ onClick, size }: AccountProps) => {
  return (
    <IconSizeContainer onClick={onClick}>
      <VisibilityOutlinedIcon
        sx={{ fontSize: size }}
        style={{ color: '#fff' }}
      />
    </IconSizeContainer>
  );
};
