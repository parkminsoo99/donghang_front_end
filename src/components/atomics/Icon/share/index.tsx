import { VscShare } from 'react-icons/vsc';
import styled from 'styled-components';
import { xs } from '@/constants/size';
const IconSizeContainer = styled.button`
  cursor: pointer;
  background: none;
  border: 0;
  padding: 0;
`;

interface AccountProps {
  onClick?: () => void;
  size: number;
  mobilesize?: number;
}

const VscShareContainer = styled(VscShare)<{
  $size: number;
  $mobilesize: number;
}>`
  color: #fff;
  font-size: ${props => `${props.$size}px`};

  @media (max-width: ${xs}) {
    font-size: ${props => `${props.$mobilesize || props.$size}px`};
  }
`;
export const Share = ({ onClick, size, mobilesize }: AccountProps) => {
  return (
    <IconSizeContainer>
      <VscShareContainer
        onClick={onClick}
        $size={size}
        $mobilesize={mobilesize}
      />
    </IconSizeContainer>
  );
};
