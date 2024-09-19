'use client';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { SxProps, Theme } from '@mui/material';
import styled from 'styled-components';
import { xs } from '@/constants/size';
import { CSSProperties } from 'react';

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
  mobilesize?: number;
}
const WatchIconContainer = styled(VisibilityOutlinedIcon)<{
  $size: number;
  $mobilesize: number;
}>`
  color: #fff;
  font-size: ${props => `${props.$size}px`};

  @media (max-width: ${xs}) {
    font-size: ${props => `${props.$mobilesize || props.$size}px`};
  }
`;

export const WatchIcon = ({ onClick, size, mobilesize }: AccountProps) => {
  return (
    <IconSizeContainer onClick={onClick}>
      <WatchIconContainer $size={size} $mobilesize={mobilesize} />
    </IconSizeContainer>
  );
};
