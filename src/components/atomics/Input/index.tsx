import styled from 'styled-components';
import { forwardRef, InputHTMLAttributes } from 'react';
import { xs } from '@/constants/size';
const InputContainer = styled.input<{
  width: number;
  height: number;
  radius: number;
  $mobilewidth: number;
  $mobileheight: number;
}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: ${({ radius }) => radius}px;
  border-color: #c7c7c7;
  color: #4f4f4f;
  border-style: solid;
  box-sizing: border-box;
  padding-left: 15px;
  @media (max-width: ${xs}) {
    width: ${props => props.$mobilewidth}px;
    height: ${props => props.$mobileheight}px;
  }
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
  mobilewidth?: number;
  mobileheight?: number;
}

export const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      width = 200,
      height = 44,
      borderRadius = 15,
      mobileheight,
      mobilewidth,
      ...rest
    } = props;

    return (
      <InputContainer
        ref={ref}
        width={width}
        height={height}
        radius={borderRadius}
        $mobileheight={mobileheight}
        $mobilewidth={mobilewidth}
        {...rest}
      />
    );
  }
);

CustomInput.displayName = 'Input';
