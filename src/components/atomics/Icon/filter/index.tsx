'use client';
import TuneIcon from '@mui/icons-material/Tune';
import styled from 'styled-components';

const IconSizeContainer = styled.button`
  height: 32px;
  width: 32px;
  border-color: #fff;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #fff;
  border: 0;
  cursor: pointer;
`;

interface AccountProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Filter = ({ onClick }: AccountProps) => {
  if (!onClick) return;
  return (
    <IconSizeContainer onClick={e => onClick(e)}>
      <TuneIcon sx={{ fontSize: 32, color: '#FFAAA4' }} />
    </IconSizeContainer>
  );
};
