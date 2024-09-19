'use client';
import styled from 'styled-components';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { xs } from '@/constants/size';
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
  mobilesize?: number;
}

const DeleteIconContainer = styled(DeleteOutlineIcon)<{
  $size: number;
  $mobilesize: number;
}>`
  color: #fff;
  font-size: ${props => `${props.$size}px`};

  @media (max-width: ${xs}) {
    font-size: ${props => `${props.$mobilesize || props.$size}px`};
  }
`;

export const DeleteIcon = ({ onClick, size, mobilesize }: AccountProps) => {
  return (
    <IconSizeContainer onClick={onClick}>
      <DeleteIconContainer $size={size} $mobilesize={mobilesize} />
    </IconSizeContainer>
  );
};
