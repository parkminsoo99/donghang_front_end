import styled from 'styled-components';
import { forwardRef, InputHTMLAttributes } from 'react';

const InputContainer = styled.input<{
  width: number;
  height: number;
  radius: number;
}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: ${({ radius }) => radius}px;
  border-color: #c7c7c7;
  color: #4f4f4f;
  border-style: solid;
  box-sizing: border-box;
  padding-left: 15px;
`;

interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'width' | 'height' | 'borderRadius'
  > {
  id?: string;
  type?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { width = 200, height = 44, borderRadius = 15, ...rest } = props;

  return (
    <InputContainer
      ref={ref}
      width={width}
      height={height}
      radius={borderRadius}
      {...rest}
    />
  );
});

Input.displayName = 'Input';
