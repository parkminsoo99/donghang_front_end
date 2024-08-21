import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import styled from 'styled-components';

const IconSizeContainer = styled.div`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

interface AccountProps {
  onClick?: () => void;
}

export const Video = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <OndemandVideoOutlinedIcon onClick={onClick} sx={{ fontSize: 20 }} />
    </IconSizeContainer>
  );
};
