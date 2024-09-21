import styled from 'styled-components';
import { Save, Heart, Chat } from '@/components/atomics/Icon';
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
`;
export const WriterFooterInfo = () => {
  return (
    <Container>
      <IconContainer>
        <Heart color="#000" />
        <Chat color="#000" />
        <Save color="#000" />
      </IconContainer>
    </Container>
  );
};
