import styled from 'styled-components';
import {
  Chat,
  Pause,
  Share,
  Save,
  Heart,
  Position,
} from '@/components/atomics/Icon';
const Container = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Video = styled.div`
  width: 430px;
  height: 670px;
  flex-shrink: 0;
  background-color: #ad1f1f;
  position: relative;
  border-color: #fff;
  z-index: 1;
  border-radius: 40px;
`;
const VideoBottomContainer = styled.div`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 70px;
  width: 430px;
  background-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
`;
const SaveShareIconContainer = styled.div`
  gap: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PauseChatPositionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 38px;
  border-radius: 20px;
  border: 1px solid #fff;
  height: 159px;
  background-color: rgba(255, 255, 255, 0.15);
`;

export const VideoContainer = () => {
  return (
    <Container>
      <Video>
        <VideoBottomContainer>
          <p style={{ color: '#fff' }}>이름</p>
          <Pause />
          <SaveShareIconContainer>
            <Save />
            <Share />
          </SaveShareIconContainer>
        </VideoBottomContainer>
      </Video>
      <PauseChatPositionContainer>
        <Heart />
        <Chat />
        <Position />
      </PauseChatPositionContainer>
    </Container>
  );
};
