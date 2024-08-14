'use client';

import styled from 'styled-components';

interface Props {
  readonly onClick?: () => void;
  readonly color?: string;
  readonly label: string;
}
const Container = styled.button`
  color: #fff;
  width: 100%;
  height: 46px;
  background-color: #000;
  border-style: solid;
  border-radius: 15px;
  &:hover {
    color: #fff;
    border-radius: 15;
    border: 0;
    background-color: #ffaaa4;
  }
  justify-content: center;
  align-items: center;
`;
export const Button = ({ color = '#fff', label, onClick }: Props) => {
  return (
    <Container color={color} onClick={onClick}>
      {label}
    </Container>
  );
};
