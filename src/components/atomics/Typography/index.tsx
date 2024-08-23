import { Typography } from 'antd';
import { CSSProperties } from 'react';
import styled from 'styled-components';
import { CSSKeyframes } from 'styled-components';
type levelProps = 1 | 2 | 3 | 4 | 5;
interface Props {
  level: levelProps;
  label: string;
  customstyle?: CSSProperties;
}

export const SubTitle = ({ level, label }: Props) => {
  const { Title } = Typography;

  const TitleStyled = styled(Title)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 !important;
    box-sizing: content-box;
  `;

  return <TitleStyled level={level}>{label}</TitleStyled>;
};
