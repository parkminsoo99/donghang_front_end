import { Typography } from 'antd';
import { CSSProperties } from 'react';
import styled from 'styled-components';

type levelProps = 1 | 2 | 3 | 4 | 5;
interface Props {
  level: levelProps;
  label: string;
  customstyle?: CSSProperties;
  color?: string;
}
const { Title } = Typography;

const TitleStyled = styled(Title)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 !important;
  box-sizing: content-box;
`;

export const SubTitle = ({ level, label, color = '#000' }: Props) => {
  return (
    <TitleStyled level={level} style={{ color: color }}>
      {label}
    </TitleStyled>
  );
};
