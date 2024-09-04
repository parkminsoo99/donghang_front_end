'use client';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
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

export const Heart = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <FavoriteBorderOutlinedIcon onClick={onClick} sx={{ fontSize: 32 }} />
    </IconSizeContainer>
  );
};
