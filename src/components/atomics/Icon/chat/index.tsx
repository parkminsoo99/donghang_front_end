import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
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

export const Chat = ({ onClick, color }: AccountProps) => {
  return (
    <IconSizeContainer $color={color}>
      <IoChatbubbleEllipsesOutline onClick={onClick} size={32} />
    </IconSizeContainer>
  );
};
