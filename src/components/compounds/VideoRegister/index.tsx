import styled from 'styled-components';
import { Search } from '@/components/atomics/Search';
import { SubTitle } from '@/components/atomics/Typography';
import {
  foodListsFirst,
  foodListsSecond,
  foodListsThird,
  foodListsForth,
} from '@/constants/foodLists';
import { CustomUpload } from '@/components/atomics/CustomUpload';
import { CustomDescription } from '@/components/atomics/Description';
import { MapFood } from '../MapFoodFiltering';
import React from 'react';
import { Button } from '@/components/atomics/Button';
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
  gap: 5px;
`;
const SubKindOfFoodContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const VideoRegister = () => {
  const FoodMargin: number = 10;
  return (
    <Container>
      <TopContainer>
        <CustomUpload
          listType="picture-card"
          maxCount={1}
          action="test"
          width={200}
          height={200}
        />
        <TopRightContainer>
          <Search
            width={330}
            height={40}
            customfont={12}
            mobilefont={8}
            placeHolder="주소 검색"
          />
          <CustomDescription
            width={330}
            height={145}
            placeHolder="설명을 작성해주세요."
          />
        </TopRightContainer>
      </TopContainer>
      <SubTitleContainer>
        <SubTitle label="분류" level={3} />
      </SubTitleContainer>
      <KindOfFoodContainer>
        <SubKindOfFoodContainer>
          {foodListsFirst.map((value, index) => (
            <MapFood
              key={index}
              src={`${value[0]}.png`}
              alt={value[1]}
              label={value[1]}
              marginvalue={FoodMargin}
            />
          ))}
        </SubKindOfFoodContainer>
        <SubKindOfFoodContainer>
          {foodListsSecond.map((value, index) => (
            <MapFood
              key={index}
              src={`${value[0]}.png`}
              alt={value[1]}
              label={value[1]}
              marginvalue={FoodMargin}
            />
          ))}
        </SubKindOfFoodContainer>
        <SubKindOfFoodContainer>
          {foodListsThird.map((value, index) => (
            <MapFood
              key={index}
              src={`${value[0]}.png`}
              alt={value[1]}
              label={value[1]}
              marginvalue={FoodMargin}
            />
          ))}
        </SubKindOfFoodContainer>
        <SubKindOfFoodContainer>
          {foodListsForth.map((value, index) => (
            <MapFood
              key={index}
              src={`${value[0]}.png`}
              alt={value[1]}
              label={value[1]}
              marginvalue={FoodMargin}
            />
          ))}
        </SubKindOfFoodContainer>
      </KindOfFoodContainer>
      <Button label="제출" width={150} />
    </Container>
  );
};
