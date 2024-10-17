import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import { Play } from '@/components/atomics/Icon';

const Container = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const VideoContainer = styled.video<{ radius: number }>`
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: ${props => props.radius || 0}px;
`;
const PlayIcon = styled.div`
  position: absolute;
  z-index: 99999;
`;

interface VideoProps {
  radius?: number;
  src?: string;
}

export const Video = ({ radius, src }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 videoRef가 초기화된 것을 확인
    console.log("videoRef.current", videoRef.current);
  }, []);

  const onPlayIconClick = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (isPlaying) {
        setIsPlaying(false);
        videoElement.pause();
      } else {
        setIsPlaying(true);
        videoElement.play();
      }
    }
  };

  return (
    <Container className="TotalVideoContainer">
      <VideoContainer
        radius={radius}
        className="SubVideoContainer"
        ref={videoRef}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        onClick={onPlayIconClick}
      >
        <source src={src || '/videos/small.mp4'} type="video/mp4" />
      </VideoContainer>
      <PlayIcon className="PlayIcon">
        {!isPlaying && <Play onClick={onPlayIconClick} />}
      </PlayIcon>
    </Container>
  );
};
