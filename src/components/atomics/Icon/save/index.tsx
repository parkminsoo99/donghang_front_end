import { IoBookmarkOutline } from 'react-icons/io5';
import styled from 'styled-components';

const IconSizeContainer = styled.div<{ $color: string }>`
  height: 28px;
  width: 28px;
  cursor: pointer;
  color: ${props => props.$color || '#fff'};
`;

interface AccountProps {
  onClick?: () => void;
  color?: string;
}

export const Save = ({ onClick, color }: AccountProps) => {
  return (
    <IconSizeContainer $color={color}>
      <IoBookmarkOutline onClick={onClick} size={28} />
    </IconSizeContainer>
  );
};
