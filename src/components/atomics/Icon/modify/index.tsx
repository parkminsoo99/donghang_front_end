import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import styled from 'styled-components';

const IconSizeContainer = styled.div`
  height: 24px;
  width: 24px;
  cursor: pointer;
  color: #000;
`;

interface AccountProps {
  onClick?: () => void;
}

export const Modify = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <CreateOutlinedIcon onClick={onClick} sx={{ fontSize: 24 }} />
    </IconSizeContainer>
  );
};
