'use client';
import { LiaSlidersHSolid } from 'react-icons/lia';
import styled from 'styled-components';

const IconSizeContainer = styled.button`
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
      <LiaSlidersHSolid color="#FFAAA4" size={28} />
    </IconSizeContainer>
  );
};
