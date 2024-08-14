import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import styled from 'styled-components';

const IconSizeContainer = styled.div`
  height: 32px;
  width: 32px;
  cursor: pointer;
`;

interface AccountProps {
  onClick?: () => void;
}

export const ProfileIcon = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <AccountCircleOutlinedIcon onClick={onClick} sx={{ fontSize: 32 }} />
    </IconSizeContainer>
  );
};
