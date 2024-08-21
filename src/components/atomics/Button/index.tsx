'use client';

import styled from 'styled-components';

interface Props {
  readonly onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  readonly color?: string;
  readonly label: string;
}

const Container = styled.button`
  width: 200px;
  color: #fff;
  height: 48px;
  background-color: #000;
  border-color: #000;
  border-style: solid;
  border-radius: 15px;
  box-sizing: border-box; //padding과 border를 포함한 크기 계산
  &:hover {
    color: #fff;
    border-color: #000;
    cursor: pointer;
    border-style: solid;
    border-radius: 15px;
    border: 0;
    background-color: #ffaaa4;
  }
`;

export const Button = ({ color = '#fff', label, onClick }: Props) => {
  return (
    <Container color={color} onClick={onClick}>
      {label}
    </Container>
  );
};
