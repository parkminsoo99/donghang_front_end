import styled from 'styled-components';
import { useRef, useState } from 'react';
import { Play } from '@/components/atomics/Icon';

const Container = styled.div`
  position: relative;
  justify-content: center;
  display: flex;
  align-items: center;
  height:100%;
  width: 100%;
`;
const VideoContainer = styled.video<{radius:number}>`
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: ${(props) => props.radius || 0}px;
`;
const PlayIcon = styled.div`
  position: absolute;
`;
interface VideoProps{
    radius:number;
}
export const Video = ({radius} : VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoElement = videoRef && videoRef.current;

  const [isPlaying, setIsPlaying] = useState(true);
  const onPlayIconClick = () => {
    console.log(videoElement);
    if (videoElement) {
      if (isPlaying) {
        console.log(1);
        setIsPlaying(!isPlaying);
        videoElement.pause();
      } else {
        console.log(2);
        setIsPlaying(!isPlaying);
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
        <source src="/videos/small.mp4" type="video/mp4" />
      </VideoContainer>
      <PlayIcon className="PlayIcon">
        {!isPlaying && <Play onClick={onPlayIconClick} />}
      </PlayIcon>
    </Container>
  );
};
