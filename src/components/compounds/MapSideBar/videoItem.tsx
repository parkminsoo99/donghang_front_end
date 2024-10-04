import styled from 'styled-components';
import { Font } from '@/components/atomics/Font';
import { Heart } from '@/components/atomics/Icon';
import { custom_map_side_bar_pixel_large } from '@/constants/size';
const Container = styled.div`
  width: 100%;
  height: 220px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  z-index: 9999;
  @media (max-width: ${custom_map_side_bar_pixel_large}) {
    height: 180px;
  }
`;
const UpperContainer = styled.div`
  width: 100%;
  height: 78%;
  @media (max-width: ${custom_map_side_bar_pixel_large}) {
    height: 60%;
  }
`;

const DownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 97%;
  height: 22%;
  gap: 3px;
  @media (max-width: ${custom_map_side_bar_pixel_large}) {
    height: 40%;
  }
`;
const ImageContainer = styled.div`
  width: 98%;
  height: 100%;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: center;
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
  flex-direction: row;
  gap: 3px;
`;
const NameContainer = styled.div`
  display: inherit;
  flex-direction: inherit;
  gap: 6px;
  align-items: center;
  justify-content: center;
`;
interface VideoItemProps {
  imageUrl?: {
    url: string;
  };
  tag: string;
  name: string;
  description: string;
  numberOfHeart: number;
}
export const VideoItem = ({
  imageUrl,
  name,
  tag,
  description,
  numberOfHeart,
}: VideoItemProps) => {
  return (
    <Container>
      <UpperContainer>
        <ImageContainer>Image</ImageContainer>
      </UpperContainer>
      <DownContainer>
        <NameWithTag>
          <NameContainer>
            <Font font={15} thick="bold" color="#000" label={name} />
            <Font font={12} color="#8E8E8E" label={tag} />
          </NameContainer>
          <Heart size={20} color="#FFAAA4" />
        </NameWithTag>
        <Font font={13} color="#000" label={description} />
        <NumberOfHeartWithValue>
          <Font font={10} label="좋아요" color="#FFAAA4" />
          <Font font={10} label={numberOfHeart} />
        </NumberOfHeartWithValue>
      </DownContainer>
    </Container>
  );
};
