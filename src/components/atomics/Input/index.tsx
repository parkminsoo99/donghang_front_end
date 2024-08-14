import styled from 'styled-components';
import { forwardRef, InputHTMLAttributes } from 'react';
const InputContainer = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 15px;
  border-color: #c7c7c7;
  color: #4f4f4f;
  border-style: solid;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  type?: string;
  placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <InputContainer ref={ref} {...props} />;
});

Input.displayName = 'Input';
