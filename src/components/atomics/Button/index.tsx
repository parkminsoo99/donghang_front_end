'use client';

import styled from 'styled-components';

interface Props {
  readonly onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  readonly color?: string;
  readonly label: string;
  readonly width?: number;
  readonly height?: number;
  readonly borderRadius?: number;
  readonly backGroundColor?: string;
  readonly hoverbackGroundColor?: string;
  readonly fontSize?: number;
}

const Container = styled.button<{
  $width?: number;
  $height?: number;
  $borderRadius?: number;
  $color?: string;
  $backGroundColor?: string;
  $hoverbackGroundColor?: string;
  $fontSize: number;
}>`
  width: ${({ $width }) => $width}px;
  color: ${({ $color }) => $color};
  height: ${({ $height }) => $height}px;
  background-color: ${({ $backGroundColor }) => $backGroundColor};
  border-color: ${({ $backGroundColor }) => $backGroundColor};
  border-style: solid;
  border-radius: ${({ $borderRadius }) => $borderRadius}px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: ${({ $fontSize }) => $fontSize}px;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
  &:hover {
    color: ${({ color }) => color};
    border-color: ${({ $backGroundColor }) => $backGroundColor};
    cursor: pointer;
    border-style: solid;
    border-color: ${({ $backGroundColor }) => $backGroundColor};
    border: 0;
    font-size: ${({ $fontSize }) => $fontSize}px;
    background-color: ${({ $hoverbackGroundColor }) => $hoverbackGroundColor};
  }
`;

export const Button = ({
  color = '#fff',
  label,
  onClick,
  width = 200,
  height = 48,
  borderRadius = 15,
  backGroundColor = '#000',
  hoverbackGroundColor = '#ffaaa4',
  fontSize = 15,
}: Props) => {
  return (
    <Container
      $fontSize={fontSize}
      $hoverbackGroundColor={hoverbackGroundColor}
      $height={height}
      $color={color}
      onClick={onClick}
      $width={width}
      $borderRadius={borderRadius}
      $backGroundColor={backGroundColor}
    >
      {label}
    </Container>
  );
};
