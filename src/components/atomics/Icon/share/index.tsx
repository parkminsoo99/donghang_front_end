import { VscShare } from 'react-icons/vsc';
import styled from 'styled-components';

const IconSizeContainer = styled.button`
  cursor: pointer;
  background: none;
  border: 0;
  padding: 0;
`;

interface AccountProps {
  onClick?: () => void;
  size: number;
}

export const Share = ({ onClick, size }: AccountProps) => {
  return (
    <IconSizeContainer>
      <VscShare onClick={onClick} size={size} color="#fff" />
    </IconSizeContainer>
  );
};
