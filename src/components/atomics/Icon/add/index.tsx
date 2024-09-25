'use client';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import styled from 'styled-components';

const IconSizeContainer = styled.div`
  cursor: pointer;
  align-items: center;
  display: flex;
  justify-content: center;
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
