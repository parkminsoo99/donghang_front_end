'use client';
import styled from 'styled-components';
import { Search } from '@/components/atomics/Search';
import { DistanceFilteringForHome } from '@/components/compounds/DistanceFiltering';
import { SubTitle } from '@/components/atomics/Typography';
import { custom_main_pixel, custom_main_input_pixel } from '@/constants/size';

const InputAndFilteringContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  @media (max-width: ${custom_main_input_pixel}) {
    gap: 10px;
  }
`;
const FilteringContainer = styled.div`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: #fff;
  @media (max-width: ${custom_main_input_pixel}) {
    width: 40px;
    height: 40px;
  }
`;
const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
`;

const TypoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SubContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 80px;
  background-color: #f2f2f2;
  @media (max-width: ${custom_main_pixel}) {
    padding-top: 50px;
  }
`;
const SubSubContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  height: 100%;
  gap: 60px;
  @media (max-width: ${custom_main_pixel}) {
    gap: 30px;
    flex-direction: column;
  }
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const RightImageContainer = styled.img`
  border-radius: 40px;
  width: 430px;
  height: 670px;

  @media (max-width: ${custom_main_pixel}) {
    width: 280px;
    height: 430px;
  }
  @media (max-width: ${custom_main_input_pixel}) {
    width: 240px;
    height: 370px;
  }
`;
export default function Home() {
  return (
    <MainContainer className="MainContainer">
      <SubContainer className="SubContainer">
        <SubSubContainer className="SubSubContainer">
          <LeftContainer>
            <TypoContainer>
              <SubTitle level={1} label="좋아하는 음식 영상" />
              <SubTitle level={1} label="찾아보세요." />
            </TypoContainer>
            <SubTitle
              level={4}
              color="rgba(37, 37, 37, 0.80)"
              label="음식 키워드를 통해 검색하기"
            />
            <InputAndFilteringContainer>
              <Search placeHolder="오늘 뭐 먹지?" />
              <FilteringContainer>
                <DistanceFilteringForHome />
              </FilteringContainer>
            </InputAndFilteringContainer>
          </LeftContainer>
          <RightImageContainer src="/images/mainImage.png" alt="main image" />
        </SubSubContainer>
      </SubContainer>
    </MainContainer>
  );
}
