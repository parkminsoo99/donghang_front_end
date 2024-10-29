import { useState } from 'react';
import styled from 'styled-components';
import { Font } from '@/components/atomics/Font';
import { Skeleton } from 'antd';
import { Video } from '../VideoContainer/video';
import { useMapIsVideoListLoad } from '@/zustand/MapVideoLoadStore/mapIsVideoListLoad';
import { Heart, FilledHeart } from '@/components/atomics/Icon';
import { NeedToLogInNotification } from '@/components/compounds/Form/loginSubmitFunction';
import { fetchVideoLike } from '@/reactQuery/VideoLike/videoLike';

const Container = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  z-index: 9999;
`;

const UpperContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const DownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 99%;
  gap: 5px;
  box-sizing: border-box;
`;

const VideoContainer = styled(Video)`
  width: 98%;
`;

const NameWithTag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: inherit;
  gap: 10px;
`;

const NameContainer = styled.div`
  display: inherit;
  flex-direction: inherit;
  gap: 6px;
  align-items: center;
  justify-content: center;
`;

const NumberOfHeartWithValue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface VideoItemProps {
  videoId: number;
  videoUrl: string;
  tag: string;
  name: string;
  description: string;
  numberOfHeart: number;
  isLike: boolean;
  token: string;
}

export const VideoItem = ({
  isLike,
  videoId,
  videoUrl,
  name,
  tag,
  description,
  numberOfHeart,
  token,
}: VideoItemProps) => {
  const [likeCount, setLikeCount] = useState(numberOfHeart);
  const [liked, setLiked] = useState(isLike);

  const onClickHeart = async () => {
    if (token) {
      try {
        // 좋아요 API 호출
        const response = await fetchVideoLike({ videoId, token });
        console.log('response', response);
        setLiked(response.data.liked);
        setLikeCount(response.data.likeCount);
        // 성공적으로 호출되면 상태 업데이트
        // if (response) {
        //   setLiked(response.liked);
        //   setLikeCount(liked ? likeCount - 1 : likeCount + 1);
        // }
      } catch (error) {
        console.error('Error liking the video:', error);
      }
    } else {
      NeedToLogInNotification();
    }
  };
  console.log('isLike', isLike);
  return (
    <Container>
      <UpperContainer>
        <VideoContainer isMapVideo={true} src={videoUrl} />
      </UpperContainer>
      <DownContainer>
        <NameWithTag>
          <NameContainer>
            <Font font={15} thick="bold" color="#000" label={name} />
            <Font font={12} color="#8E8E8E" thick="bold" label={tag} />
          </NameContainer>
          <NumberOfHeartWithValue>
            {liked ? (
              <>
                <FilledHeart color="#FFAAA4" onClick={onClickHeart} />
                <Font
                  color="#8E8E8E"
                  thick="bold"
                  font={10}
                  label={likeCount}
                />
              </>
            ) : (
              <>
                <Heart color="#FFAAA4" onClick={onClickHeart} />
                <Font
                  color="#8E8E8E"
                  thick="bold"
                  font={10}
                  label={likeCount}
                />
              </>
            )}
          </NumberOfHeartWithValue>
        </NameWithTag>
        <Font font={13} color="#000" label={description} />
      </DownContainer>
    </Container>
  );
};
