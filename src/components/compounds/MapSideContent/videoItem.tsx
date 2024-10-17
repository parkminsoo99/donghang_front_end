import styled from 'styled-components';
import { Font } from '@/components/atomics/Font';
import { Heart, FilledHeart } from '@/components/atomics/Icon';
import { custom_map_side_bar_pixel_large, custom_map_side_bar_pixel_medium, custom_map_side_bar_pixel_small} from '@/constants/size';
import { useState } from 'react';
import { Video } from '../VideoContainer/video';

const Container = styled.div`
  width: 100%;
  height: 580px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  z-index: 9999;
`;
const UpperContainer = styled.div`
  width: 100%;
  height: 75%;
  @media(max-width: ${custom_map_side_bar_pixel_large}){
    height: 55%;
  }
  @media(max-width: ${custom_map_side_bar_pixel_medium}){
    height: 40%;
  }
  @media(max-width: ${custom_map_side_bar_pixel_small}){
    height: 20%;
  }
`;
const DownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 97%;
  height: 25%;
  @media(max-width: ${custom_map_side_bar_pixel_large}){
    height: 45%;
  }
  @media(max-width: ${custom_map_side_bar_pixel_medium}){
    height: 60%;
  }
  @media(max-width: ${custom_map_side_bar_pixel_small}){
    height: 80%;
  }
`;
const VideoContainer = styled(Video)`
  width: 98%;
  height: 100%;
`;

const NameWithTag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: inherit;
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
        <VideoContainer src={videoUrl}/>
      </UpperContainer>
      <DownContainer>
        <NameWithTag>
          <NameContainer>
            <Font font={15} thick="bold" color="#000" label={name} />
            <Font font={12} color="#8E8E8E" label={tag} />
          </NameContainer>
          {isClickedHeart ? (
            <NumberOfHeartWithValue>
              <Heart color="#FFAAA4" onClick={() => onClickHeart()} />
              <Font color="#8E8E8E" font={10} label={numberOfHeart} />
            </NumberOfHeartWithValue>
          ) : (
            <NumberOfHeartWithValue>
              <FilledHeart color="#FFAAA4" onClick={() => onClickHeart()} />
              <Font color="#8E8E8E" font={10} label={numberOfHeart} />
            </NumberOfHeartWithValue>
          )}
        </NameWithTag>
        <Font font={13} color="#000" label={description} />
      </DownContainer>
    </Container>
  );
};
