import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import { Play } from '@/components/atomics/Icon';
import {
  custom_map_side_bar_pixel_large,
  custom_map_side_bar_pixel_medium,
  custom_map_side_bar_pixel_small,
} from '@/constants/size';
const Container = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const VideoContainer = styled.video<{ radius: number; isMapVideo: boolean }>`
  width: 100%;
  object-fit: fill;
  border-radius: ${props => props.radius || 0}px;

  height: ${props => (props.isMapVideo ? '400px' : '100%')};

  ${props =>
    props.isMapVideo &&
    `
    @media (max-width: ${custom_map_side_bar_pixel_large}) {
      height: 280px;
    }
    @media (max-width: ${custom_map_side_bar_pixel_medium}) {
      height: 200px;
    }
    @media (max-width: ${custom_map_side_bar_pixel_small}) {
      height: 150px;
    }
  `}
`;
const PlayIcon = styled.div`
  position: absolute;
  z-index: 99999;
`;

interface VideoProps {
  radius?: number;
  src?: string;
  isMapVideo: boolean;
}

export const Video = ({ radius, src, isMapVideo }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isMapVideo) {
      setIsPlaying(!isPlaying);
    }
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
      {isMapVideo ? (
        <>
          <VideoContainer
            isMapVideo={isMapVideo}
            radius={radius}
            className="SubVideoContainer"
            ref={videoRef}
            autoPlay={false}
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
        </>
      ) : (
        <>
          <VideoContainer
            isMapVideo={isMapVideo}
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
        </>
      )}
    </Container>
  );
};
