import DehazeSharpIcon from '@mui/icons-material/DehazeSharp';
import styled from 'styled-components';

const Container = styled.button`
  border-color: #fff;
  background-color: #fff;
  border: 0;
  cursor: pointer;
`;

interface ThreeBarProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ThreeBars = ({ onClick }: ThreeBarProps) => {
  if (!onClick) return;
  return (
    <Container onClick={e => onClick(e)}>
      <DehazeSharpIcon sx={{ fontSize: 24 }} />
    </Container>
  );
};
