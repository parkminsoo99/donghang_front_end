import { VscShare } from 'react-icons/vsc';
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

export const Share = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <VscShare onClick={onClick} size={28} />
    </IconSizeContainer>
  );
};
