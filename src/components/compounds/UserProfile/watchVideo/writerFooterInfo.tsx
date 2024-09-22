import styled from 'styled-components';
import { Save, Heart } from '@/components/atomics/Icon';
import { CustomAvatar } from '@/components/atomics/Avatar';
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
  align-items: center;
`;
export const WriterFooterInfo = () => {
  return (
    <Container>
      <IconContainer>
        <Heart color="#000" size={32} />
        <Save color="#000" size={30} />
      </IconContainer>
    </Container>
  );
};
