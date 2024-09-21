'use client';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import styled from 'styled-components';

const IconSizeContainer = styled.div<{ $color: string }>`
  height: 32px;
  width: 32px;
  cursor: pointer;
  color: ${props => props.$color || '#fff'};
`;

interface AccountProps {
  onClick?: () => void;
  color?: string;
}

export const Heart = ({ onClick, color }: AccountProps) => {
  return (
    <IconSizeContainer $color={color}>
      <FavoriteBorderOutlinedIcon onClick={onClick} sx={{ fontSize: 32 }} />
    </IconSizeContainer>
  );
};
