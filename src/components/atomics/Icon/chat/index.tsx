import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import styled from 'styled-components';

const IconSizeContainer = styled.div`
  height: 32px;
  width: 32px;
  cursor: pointer;
  color: #fff;
`;

interface AccountProps {
  onClick?: () => void;
}

export const Chat = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <IoChatbubbleEllipsesOutline onClick={onClick} size={32} />
    </IconSizeContainer>
  );
};
