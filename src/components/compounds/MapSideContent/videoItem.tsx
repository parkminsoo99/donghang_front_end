import styled from 'styled-components';
import { Font } from '@/components/atomics/Font';
import { Heart, FilledHeart } from '@/components/atomics/Icon';
import { Skeleton } from 'antd';
import { useState } from 'react';
import { Video } from '../VideoContainer/video';
import { useMapIsVideoListLoad } from '@/zustand/MapVideoLoadStore/mapIsVideoListLoad';
import './videoSkeleton.css';

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

const NumberOfHeartWithValue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NameContainer = styled.div`
  display: inherit;
  flex-direction: inherit;
  gap: 6px;
  align-items: center;
  justify-content: center;
`;

interface VideoItemProps {
  videoUrl: string;
  tag: string;
  name: string;
  description: string;
  numberOfHeart: number;
}

export const VideoItem = ({
  videoUrl,
  name,
  tag,
  description,
  numberOfHeart,
}: VideoItemProps) => {
  const [isClickedHeart, setIsClickedHeart] = useState<boolean>(true);
  const onClickHeart = () => {
    setIsClickedHeart(!isClickedHeart);
  };

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
          {isClickedHeart ? (
            <NumberOfHeartWithValue>
              <Heart color="#FFAAA4" onClick={() => onClickHeart()} />
              <Font
                color="#8E8E8E"
                thick="bold"
                font={10}
                label={numberOfHeart}
              />
            </NumberOfHeartWithValue>
          ) : (
            <NumberOfHeartWithValue>
              <FilledHeart color="#FFAAA4" onClick={() => onClickHeart()} />
              <Font
                color="#8E8E8E"
                thick="bold"
                font={10}
                label={numberOfHeart}
              />
            </NumberOfHeartWithValue>
          )}
        </NameWithTag>
        <Font font={13} color="#000" label={description} />
      </DownContainer>
    </Container>
  );
};
