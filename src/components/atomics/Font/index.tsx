import styled from 'styled-components';
import { forwardRef } from 'react';
import { xs } from '@/constants/size';
import React from 'react';
interface Props {
  font: number;
  label: string;
  color?: string;
  thick?: string;
  mobilefont?: number;
  className?: string;
  onClick?: () => void;
  buttonMode?: boolean;
}

const FontContainer = styled.div<{
  $font: number;
  $color?: string;
  $thick?: string;
  $mobilefont?: number;
  $buttonmode?: boolean;
}>`
  font-size: ${props => props.$font}px;
  color: ${props => props.$color || '#000'};
  font-weight: ${props => props.$thick || 'normal'};
  display: inline-block;
  cursor: ${props => (props.$buttonmode ? 'pointer' : 'auto')};
  @media (max-width: ${xs}) {
    font-size: ${props => props.$mobilefont}px;
  }
`;

export const Font = forwardRef<HTMLDivElement, Props>(
  (
    {
      className,
      font,
      label,
      color,
      thick,
      mobilefont,
      onClick,
      buttonMode = false,
    },
    ref
  ) => {
    return (
      <FontContainer
        onClick={onClick}
        className={className}
        $font={font}
        $color={color}
        $thick={thick}
        $mobilefont={mobilefont}
        ref={ref}
        $buttonmode={buttonMode}
      >
        {label}
      </FontContainer>
    );
  }
);

Font.displayName = 'Font';
