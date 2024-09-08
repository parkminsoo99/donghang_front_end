import styled from 'styled-components';
import { forwardRef, InputHTMLAttributes } from 'react';
const InputContainer = styled.input<{
  width: number;
  height: number;
  borderRadius: number;
}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  border-color: #c7c7c7;
  color: #4f4f4f;
  border-style: solid;
  box-sizing: border-box;
  padding-left: 15px;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  type?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <InputContainer
      ref={ref}
      {...props}
      width={props.width || 200}
      height={props.height || 44}
      borderRadius={props.borderRadius || 15}
    />
  );
});

Input.displayName = 'Input';
