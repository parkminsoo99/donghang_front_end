import PauseIcon from '@mui/icons-material/Pause';
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

export const Pause = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <PauseIcon onClick={onClick} sx={{ fontSize: 28 }} />
    </IconSizeContainer>
  );
};
