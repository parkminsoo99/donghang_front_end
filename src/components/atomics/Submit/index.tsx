'use client';
import styled from 'styled-components';
import { forwardRef, InputHTMLAttributes } from 'react';
const SubmitContainer = styled.input`
  background-color: '#000';
  color: '#F1F1F1';
  border-radius: 15;
`;

interface SubmitProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  type?: string;
  title?: string;
}

export const Submit = forwardRef<HTMLInputElement, SubmitProps>(
  (props, ref) => {
    return (
      <SubmitContainer ref={ref} {...props}>
        {props.title}
      </SubmitContainer>
    );
  }
);

Submit.displayName = 'Submit';
