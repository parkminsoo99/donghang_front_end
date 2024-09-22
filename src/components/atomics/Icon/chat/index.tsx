import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import styled from 'styled-components';

const IconSizeContainer = styled.div<{ $color: string }>`
  cursor: pointer;
  color: ${props => props.$color || '#fff'};
`;

interface AccountProps {
  onClick?: () => void;
  color?: string;
  size?: number;
}

export const Chat = ({ onClick, color, size }: AccountProps) => {
  return (
    <IconSizeContainer $color={color}>
      <IoChatbubbleEllipsesOutline onClick={onClick} size={size || 28} />
    </IconSizeContainer>
  );
};
