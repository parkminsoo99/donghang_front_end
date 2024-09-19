import styled from 'styled-components';
import { xs } from '@/constants/size';
interface Props {
  font: number;
  label: string;
  color?: string;
  thick?: string;
  mobilefont?: number;
}
const FontContainer = styled.div<{
  $font: number;
  $color?: string;
  $thick?: string;
  $mobilefont?: number;
}>`
  font-size: ${props => props.$font}px;
  color: ${props => props.$color || '#000'};
  font-weight: ${props => props.$thick || 'normal'};
  display: inline-block;
  @media (max-width: ${xs}) {
    font-size: ${props => props.$mobilefont}px;
  }
`;

export const Font = ({ font, label, color, thick, mobilefont }: Props) => {
  return (
    <FontContainer
      $font={font}
      $color={color}
      $thick={thick}
      $mobilefont={mobilefont}
    >
      {label}
    </FontContainer>
  );
};
