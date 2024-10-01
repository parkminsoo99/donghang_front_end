'use client';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import styled from 'styled-components';

const IconSizeContainer = styled.div<{ $color: string }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.$color || '#000'};
`;

interface AccountProps {
  onClick?: () => void;
  size?: number;
  color?: string;
}

export const Map = ({ onClick, size, color }: AccountProps) => {
  return (
    <IconSizeContainer $color={color}>
      <TravelExploreOutlinedIcon
        onClick={onClick}
        sx={{ fontSize: size || 20 }}
      />
    </IconSizeContainer>
  );
};
