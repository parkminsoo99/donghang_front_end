import { Typography, Flex } from 'antd';

type levelProps = 1 | 2 | 3 | 4 | 5;
interface Props {
  level: levelProps;
  label: string;
}
export const SubTitle = ({ level, label }: Props) => {
  const { Title } = Typography;
  return (
    <Flex align="center" justify="center">
      <Title level={level}>{label}</Title>
    </Flex>
  );
};
