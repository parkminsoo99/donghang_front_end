'use client';
import { HomeOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const IconSizeContainer = styled.div`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

interface AccountProps {
  onClick?: () => void;
}

export const Home = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <HomeOutlined onClick={onClick} style={{ fontSize: 20 }} />
    </IconSizeContainer>
  );
};
