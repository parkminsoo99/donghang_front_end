import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styled from 'styled-components';
const IconSizeContainer = styled.div`
  cursor: pointer;
  background-color: #000;
  z-index: 9999!important;
  border-radius: 80px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface AccountProps {
  onClick?: () => void;
}

export const Play = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer className='PlayIcon'>
      <PlayArrowIcon onClick={onClick} sx={{ fontSize: 48, color:'#fff'}} />
    </IconSizeContainer>
  );
};
