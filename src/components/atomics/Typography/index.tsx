import { Typography } from 'antd';
import styled from 'styled-components';
type levelProps = 1 | 2 | 3 | 4 | 5;
interface Props {
  level: levelProps;
  label: string;
}
const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
`;

export const SubTitle = ({ level, label }: Props) => {
  const { Title } = Typography;
  return (
    <Container>
      <Title level={level}>{label}</Title>
    </Container>
  );
};
