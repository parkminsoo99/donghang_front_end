import styled from 'styled-components';
import { SubTitle } from '@/components/atomics/Typography';
import { CustomAutoComplete } from '@/components/atomics/AutoComplete';
import {
  MobileSubKindOfFoodContainerReturn,
  SubKindOfFoodContainerReturn,
} from './subContainerComponent';
import { CustomUpload } from '@/components/atomics/CustomUpload';
import { CustomDescription } from '@/components/atomics/Description';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/atomics/Button';
import { custom_video_register_pixel } from '@/constants/size';
import { fetchAddress } from '@/reactQuery/Search/addressSearch';
import { useSearchInputStore } from '@/zustand/FoodSearchStore/InputStore';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  align-items: center;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  @media (max-width: ${custom_video_register_pixel}) {
    gap: 10px;
  }
`;
const TopRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SubTitleContainer = styled.div`
  border-bottom: 1px solid #000;
  box-sizing: content-box;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 10px;
  width: 100%;
`;
const KindOfFoodContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  @media (max-width: ${custom_video_register_pixel}) {
    gap: 5px;
  }
`;

export const VideoRegister = () => {
  const [windowWitdth, setWindowWidth] = useState(window.innerWidth);
  const { userInput, setUserInput } = useSearchInputStore();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const isMobile = windowWitdth >= 611;

  return (
    <Container>
      <TopContainer>
        <CustomUpload
          listType="picture-card"
          maxCount={1}
          action="test"
          width={200}
          height={200}
          mobileHeight={155}
          mobileWidth={130}
        />
        <TopRightContainer>
          <CustomAutoComplete
            width={330}
            height={40}
            customfont={12}
            mobilefont={12}
            mobileHeight={40}
            mobileWidth={200}
            query={fetchAddress}
            placeHolder="주소 검색"
          />
          <CustomDescription
            placeHolder="설명을 작성해주세요."
            mobileHeight={100}
            mobileWidth={200}
            width={330}
            height={145}
          />
        </TopRightContainer>
      </TopContainer>
      <SubTitleContainer>
        <SubTitle label="분류" level={3} />
      </SubTitleContainer>
      <KindOfFoodContainer>
        {(isMobile && SubKindOfFoodContainerReturn()) ||
          MobileSubKindOfFoodContainerReturn()}
      </KindOfFoodContainer>
      <Button label="제출" width={150} />
    </Container>
  );
};
