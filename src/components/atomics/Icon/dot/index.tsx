import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import styled from 'styled-components';
const IconSizeContainer = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: #fff;
  padding: 0;
`;

interface AccountProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: number;
}

export const Dot = ({ onClick, size }: AccountProps) => {
  return (
    <IconSizeContainer
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick?.(e)}
    >
      <MoreHorizIcon sx={{ fontSize: size || 14 }} />
    </IconSizeContainer>
  );
};
