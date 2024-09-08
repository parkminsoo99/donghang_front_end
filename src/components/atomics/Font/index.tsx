import styled from 'styled-components';

interface Props {
  font: number;
  label: string;
  color?: string;
  thick?: string;
}

const FontContainer = styled.div<{
  font: number;
  color?: string;
  thick?: string;
}>`
  font-size: ${({ font }) => font}px;
  color: ${({ color }) => color || '#000'};
  font-weight: ${({ thick }) => thick || 'normal'};
  display: inline-block;
`;

export const Font = ({ font, label, color, thick }: Props) => {
  return (
    <FontContainer font={font} color={color} thick={thick}>
      {label}
    </FontContainer>
  );
};
