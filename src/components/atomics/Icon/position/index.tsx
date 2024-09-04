import { PiMapPinLineLight } from 'react-icons/pi';
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

export const Position = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <PiMapPinLineLight onClick={onClick} size={32} />
    </IconSizeContainer>
  );
};
