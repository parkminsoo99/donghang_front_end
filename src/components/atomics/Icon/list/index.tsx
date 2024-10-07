'use client';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';

const IconSizeContainer = styled.div<{ $color: string }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.$color || '#000'};
  position: fixed;
  right: 5px;
  top: 50%;
  z-index: 99999;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow:
    5px 5px 10px 0px rgba(0, 0, 0, 0.2),
    5px 5px 10px 0px rgba(0, 0, 0, 0.1);
`;

interface AccountProps {
  onClick?: () => void;
  size?: number;
  color?: string;
}

export const CustomList = ({ onClick, size, color }: AccountProps) => {
  return (
    <IconSizeContainer className="menu-icon" $color={color}>
      <MenuIcon onClick={onClick} sx={{ fontSize: size || 20 }} />
    </IconSizeContainer>
  );
};
