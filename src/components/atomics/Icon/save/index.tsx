import { IoBookmarkOutline } from 'react-icons/io5';
import styled from 'styled-components';

const IconSizeContainer = styled.div<{ $color: string }>`
  cursor: pointer;
  color: ${props => props.$color || '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface AccountProps {
  onClick?: () => void;
  color?: string;
  size?: number;
}

export const Save = ({ onClick, color, size }: AccountProps) => {
  return (
    <IconSizeContainer $color={color}>
      <IoBookmarkOutline onClick={onClick} size={size || 28} />
    </IconSizeContainer>
  );
};
