import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import styled from 'styled-components';
const IconSizeContainer = styled.div`
  cursor: pointer;
  color: #fff;
`;

interface AccountProps {
  onClick?: () => void;
}

export const Play = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <PlayCircleFilledRoundedIcon onClick={onClick} sx={{ fontSize: 52 }} />
    </IconSizeContainer>
  );
};
