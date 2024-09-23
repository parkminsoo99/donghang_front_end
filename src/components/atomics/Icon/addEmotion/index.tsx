import { AiOutlineSmile } from 'react-icons/ai';
import styled from 'styled-components';

const IconSizeContainer = styled.div`
  cursor: pointer;
  color: #000;
  align-items: center;
  display: flex;
  box-sizing: content-box;
`;

interface AccountProps {
  onClick?: () => void;
}

export const AddEmotion = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <AiOutlineSmile onClick={onClick} size={28} />
    </IconSizeContainer>
  );
};
