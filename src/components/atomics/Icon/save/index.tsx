import { IoBookmarkOutline } from 'react-icons/io5';
import styled from 'styled-components';

const IconSizeContainer = styled.div`
  height: 28px;
  width: 28px;
  cursor: pointer;
  color: #fff;
`;

interface AccountProps {
  onClick?: () => void;
}

export const Save = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <IoBookmarkOutline onClick={onClick} size={28} />
    </IconSizeContainer>
  );
};
