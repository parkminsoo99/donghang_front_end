import styled from 'styled-components';
import { Video } from './video';
import { CustomSpinner } from '@/components/atomics/Spinner/indext';
import { useState, useEffect, useCallback } from 'react';
import {
  Chat,
  Pause,
  Share,
  Save,
  Heart,
  Position,
  FilledHeart,
} from '@/components/atomics/Icon';
import { Font } from '@/components/atomics/Font';
import CustomNotification from '@/components/atomics/Notification';
import { fetchVideoLike } from '@/reactQuery/VideoLike/videoLike';
import { NeedToLogInNotification } from '../Form/loginSubmitFunction';
import { isNil } from 'lodash';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const VideoContainer = styled.div`
  width: 25rem;
  height: 40rem;
  flex-shrink: 0;
  background-color: none;
  position: relative;
  border-color: #fff;
  z-index: 1;
  border-radius: 40px;
  @media (max-width: 768px) {
    width: 18rem;
    height: 30rem;
  }
`;

const VideoBottomContainer = styled.div`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: calc(100% - 90%);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0 0 40px 40px;
`;

const FontContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
`;

const SaveShareIconContainer = styled.div`
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NumberOfCountOntheIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
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
  background-color: rgba(255, 255, 255, 0.2);
`;

const ContainerOfVideoNull = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface VideoTemplateProps {
  data: any;
  userToken: string;
}
export const VideoTemplate = ({ data, userToken }: VideoTemplateProps) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isvideoData, setIsvideoData] = useState(false);
  useEffect(() => {
    if (data) {
      console.log('data', data);
      setLikeCount(data.pages[0].data[0].likeCount);
      setLiked(data.pages[0].data[0].like);
      setIsvideoData(true);
    }
  }, [data]);

  const onClickChattingIcon = () => {
    CustomNotification({
      message: '해당 기능은 아직 이용할 수 없습니다.',
      placement: 'top',
      type: 'warning',
    });
  };

  const onClickHeart = async () => {
    if (!userToken) {
      NeedToLogInNotification();
      return;
    }

    try {
      const response = await fetchVideoLike({
        videoId: data.pages[0].data[0].videoId,
        token: userToken,
      });
      setLiked(response.data.liked);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error('Error liking the video:', error);
      CustomNotification({
        message: '좋아요 처리 중 오류가 발생했습니다.',
        type: 'error',
        placement: 'top',
      });
    }
  };
  return (
    <>
      {isvideoData ? (
        <Container className="Container">
          <VideoContainer className="VideoContainer">
            <Video
              src={data.pages[0].data[0].url}
              isMapVideo={false}
              radius={40}
            />
            <VideoBottomContainer>
              <FontContainer>
                <Font
                  color="#fff"
                  label={data.pages[0].data[0].userNickname}
                  thick="bold"
                  font={14}
                />
                <Font
                  color="#fff"
                  label={data.pages[0].data[0].content}
                  font={12}
                />
              </FontContainer>
              <SaveShareIconContainer>
                <Save size={32} />
                <Share size={32} />
              </SaveShareIconContainer>
            </VideoBottomContainer>
          </VideoContainer>
          <PauseChatPositionContainer>
            {liked ? (
              <NumberOfCountOntheIcon>
                <FilledHeart color="#FFAAA4" onClick={onClickHeart} />
                <Font color="#fff" font={10} thick="bold" label={likeCount} />
              </NumberOfCountOntheIcon>
            ) : (
              <NumberOfCountOntheIcon>
                <Heart onClick={onClickHeart} />
                <Font color="#fff" font={10} thick="bold" label={likeCount} />
              </NumberOfCountOntheIcon>
            )}
            <NumberOfCountOntheIcon>
              <Chat onClick={onClickChattingIcon} />
              <Font color="#fff" thick="bold" font={10} label="0" />
            </NumberOfCountOntheIcon>
            <Position />
          </PauseChatPositionContainer>
        </Container>
      ) : (
        <ContainerOfVideoNull>
          <Font
            color="#fff"
            font={20}
            label="더 이상 불러올 영상이 없습니다."
          />
        </ContainerOfVideoNull>
      )}
    </>
  );
};
