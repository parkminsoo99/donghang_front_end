'use client';
import styled from 'styled-components';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const IconSizeContainer = styled.button`
  border-color: none;
  justify-content: center;
  align-items: center;
  display: flex;
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

export const DeleteIcon = ({ onClick, size }: AccountProps) => {
  return (
    <IconSizeContainer onClick={onClick}>
      <DeleteOutlineIcon sx={{ fontSize: size }} style={{ color: '#ffff' }} />
    </IconSizeContainer>
  );
};
