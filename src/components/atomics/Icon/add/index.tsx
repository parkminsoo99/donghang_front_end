'use client';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import styled from 'styled-components';

const IconSizeContainer = styled.div`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

interface AccountProps {
  onClick?: () => void;
}

export const Add = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <AddBoxOutlinedIcon onClick={onClick} sx={{ fontSize: 20 }} />
    </IconSizeContainer>
  );
};
