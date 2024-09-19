import styled from 'styled-components';
import { MapFood } from '../MapFoodFiltering';
import {
  foodListsFirst,
  foodListsSecond,
  foodListsThird,
  foodListsForth,
  mobileFoodFoodistsThird,
  mobileFoodListsFive,
  mobileFoodListsSecond,
  mobileFoodListsFirst,
  mobileFoodListsForth,
} from '@/constants/foodLists';

const SubKindOfFoodContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const FoodMargin: number = 10;
const MobileFoodMargin: number = 15;

export const SubKindOfFoodContainerReturn = () => {
  return (
    <>
      <SubKindOfFoodContainer>
        {foodListsFirst.map((value, index) => (
          <MapFood
            key={index}
            src={`${value[0]}.png`}
            alt={value[1]}
            label={value[1]}
            marginvalue={FoodMargin}
            mobilemarginvalue={MobileFoodMargin}
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
            mobilemarginvalue={MobileFoodMargin}
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
            mobilemarginvalue={MobileFoodMargin}
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
            mobilemarginvalue={MobileFoodMargin}
          />
        ))}
      </SubKindOfFoodContainer>
    </>
  );
};
export const MobileSubKindOfFoodContainerReturn = () => {
  return (
    <>
      <SubKindOfFoodContainer>
        {mobileFoodListsFirst.map((value, index) => (
          <MapFood
            key={index}
            src={`${value[0]}.png`}
            alt={value[1]}
            label={value[1]}
            marginvalue={FoodMargin}
            mobilemarginvalue={MobileFoodMargin}
          />
        ))}
      </SubKindOfFoodContainer>
      <SubKindOfFoodContainer>
        {mobileFoodListsSecond.map((value, index) => (
          <MapFood
            key={index}
            src={`${value[0]}.png`}
            alt={value[1]}
            label={value[1]}
            marginvalue={FoodMargin}
            mobilemarginvalue={MobileFoodMargin}
          />
        ))}
      </SubKindOfFoodContainer>
      <SubKindOfFoodContainer>
        {mobileFoodFoodistsThird.map((value, index) => (
          <MapFood
            key={index}
            src={`${value[0]}.png`}
            alt={value[1]}
            label={value[1]}
            marginvalue={FoodMargin}
            mobilemarginvalue={MobileFoodMargin}
          />
        ))}
      </SubKindOfFoodContainer>
      <SubKindOfFoodContainer>
        {mobileFoodListsForth.map((value, index) => (
          <MapFood
            key={index}
            src={`${value[0]}.png`}
            alt={value[1]}
            label={value[1]}
            marginvalue={FoodMargin}
            mobilemarginvalue={MobileFoodMargin}
          />
        ))}
      </SubKindOfFoodContainer>
      <SubKindOfFoodContainer>
        {mobileFoodListsFive.map((value, index) => (
          <MapFood
            key={index}
            src={`${value[0]}.png`}
            alt={value[1]}
            label={value[1]}
            marginvalue={FoodMargin}
            mobilemarginvalue={MobileFoodMargin}
          />
        ))}
      </SubKindOfFoodContainer>
    </>
  );
};
