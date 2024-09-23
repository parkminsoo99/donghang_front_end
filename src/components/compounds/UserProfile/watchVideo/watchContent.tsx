import { FC } from 'react';
import styled from 'styled-components';
import { WriterHeaderInfo } from './writerHeaderInfo';
import { WriterFooterInfo } from './writerFooterInfo';
import { WriterBodyInfo } from './writerBodyInfo';
import './customVideoModal.css';
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
`;
const LeftSideContainer = styled.div`
  width: 45%;
  height: 100%;
`;
const LeftSideImage = styled.img`
  width: 100%;
  height: 100%;
`;
const RightSideContainer = styled.div`
  width: 55%;
  height: 100%;
`;
export const ContentInWatchIcon: FC = () => {
  return (
    <Container>
      <LeftSideContainer>
        <LeftSideImage src="/images/mainImage.png" />
      </LeftSideContainer>
      <RightSideContainer>
        <WriterHeaderInfo />
        <WriterBodyInfo />
        <WriterFooterInfo />
      </RightSideContainer>
    </Container>
  );
};
