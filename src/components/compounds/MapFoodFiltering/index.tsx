import styled from 'styled-components';
import Image from 'next/image';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { FC, useEffect, useRef, useState } from 'react';
const foodList = [
  ['all', '전체'],
  ['chicken', '치킨'],
  ['bakery', '베이커리'],
  ['cafeAndDesert', '카페·디저트'],
  ['chinese', '중식'],
  ['fish', '해산물'],
  ['hamburger', '햄버거'],
  ['japan', '일식'],
  ['korea', '한식'],
  ['meat', '고기'],
  ['noodle', '죽·국수'],
  ['salad', '샐러드'],
  ['schoolFood', '분식'],
  ['westenFood', '양식'],
] as string[][];

interface Props {
  src: string;
  alt: string;
  label: string;
  key: number;
}
const DEFAULT_TOTAL_VALUE = 1900;
const FoodFilteringContainer = styled.div`
  display: inline-block;
  border-radius: 40px;
  flex-shrink: 0;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 0px 25px;
  &:hover {
    color: #fff;
    border: 1px solid #f4eae0;
    background-color: #f3dfc8;
  }
`;

const FoodFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const FoodDescriptionContainer = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const ButtonStyledContainer = styled.button`
  display: inline-block;
  flex-shrink: 0;
  align-items: center;
  padding: 8px;
  justify-content: center;
  border-radius: 16px;
  width: 30px;
  height: 30px;
  background: var(--Default, #fff);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);
  border: 0;
  &:hover {
    color: #fff;
    border: 0px solid #f4eae0;
    background-color: #f3dfc8;
    cursor: pointer;
  }
`;

const MapFood: FC<Props> = ({ src, alt, label }) => {
  return (
    <FoodFilteringContainer className={alt}>
      <FoodFlexContainer>
        <Image src={`/images/${src}`} width={24} height={24} alt={alt} />
        <FoodDescriptionContainer>{label}</FoodDescriptionContainer>
      </FoodFlexContainer>
    </FoodFilteringContainer>
  );
};

const Container = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

const TotalContainer = styled.div`
  overflow: hidden;
  cursor: grab;
  &.active {
    cursor: grabbing;
  }
`;

const PartitialContainer = styled.div`
  min-width: ${DEFAULT_TOTAL_VALUE}px;
  display: flex !important;
  flex-direction: row !important;
  gap: 14px !important;
  transition: left 0.3s ease;
  position: relative;
  left: 0;
`;

const initializeData = (
  width: number,
  setPosition: (positions: number[]) => void,
  setItemCount: (itemCount: number) => void,
  setCurrentIdx: (currentIdx: number) => void
) => {
  let pixel = width;
  let count = 1;
  const positions = [0];
  for (let i = 0; i < DEFAULT_TOTAL_VALUE; i++) {
    pixel = pixel + i * width;
    console.log('pixel', width);
    if (pixel + width > DEFAULT_TOTAL_VALUE) {
      positions.push(DEFAULT_TOTAL_VALUE - width + 115);
      count++;
      break;
    }
    positions.push(pixel);
    count++;
  }
  console.log('positions', positions);
  setPosition(positions);
  setItemCount(count);
  setCurrentIdx(0);
};

type totalFoodContainerType = HTMLDivElement;

export const MapFoodFiltering: FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [position, setPosition] = useState<number[]>([]);
  const [itemCount, setItemCount] = useState<number>(2);
  const totalFoodContainerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<{
    totalFoodContainer: totalFoodContainerType | null;
    partitialFoodContainer: Element | null;
    ContainerDiv: Element | null;
    PreviousBtn: Element | null;
    NextBtn: Element | null;
  }>({
    totalFoodContainer: null,
    partitialFoodContainer: null,
    ContainerDiv: null,
    PreviousBtn: null,
    NextBtn: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          const width = entry.contentRect.width;
          initializeData(width, setPosition, setItemCount, setCurrentIdx);
        }
      });
      if (targetRef.current && elements.totalFoodContainer) {
        resizeObserver.observe(elements.totalFoodContainer);
      }
      return () => {
        if (targetRef.current && elements.totalFoodContainer) {
          resizeObserver.unobserve(elements.totalFoodContainer);
        }
      };
    }
  }, [elements.totalFoodContainer]);

  useEffect(() => {
    const totalFoodContainer = document.querySelector(
      '.totalFoodContainer'
    ) as totalFoodContainerType;
    const partitialFoodContainer = document.querySelector(
      '.partitialFoodContainer'
    );
    const ContainerDiv = document.querySelector('.Container');
    const PreviousBtn = document.querySelector('.PreviousBtn');
    const NextBtn = document.querySelector('.NextBtn');

    setElements({
      totalFoodContainer,
      partitialFoodContainer,
      ContainerDiv,
      PreviousBtn,
      NextBtn,
    });
  }, []);

  const ButtonClick = (key: 'NEXT' | 'PREVIOUS') => {
    if (key === 'NEXT' && currentIdx < itemCount - 1) {
      setCurrentIdx(prevIdx => prevIdx + 1);
    } else if (key === 'PREVIOUS' && currentIdx > 0) {
      setCurrentIdx(prevIdx => prevIdx - 1);
    }
  };

  useEffect(() => {
    if (totalFoodContainerRef.current) {
      totalFoodContainerRef.current.style.left = `-${position[currentIdx]}px`;
    }
  }, [currentIdx, position]);

  return (
    <Container ref={targetRef} className="Container">
      <ButtonStyledContainer
        className="PreviousBtn"
        onClick={() => ButtonClick('PREVIOUS')}
      >
        <LeftOutlined size={24} />
      </ButtonStyledContainer>
      <TotalContainer className="totalFoodContainer">
        <PartitialContainer
          ref={totalFoodContainerRef}
          className="partitialFoodContainer"
        >
          {foodList.map((value, index) => (
            <MapFood
              key={index}
              src={`${value[0]}.png`}
              alt={value[1]}
              label={value[1]}
            />
          ))}
        </PartitialContainer>
      </TotalContainer>
      <ButtonStyledContainer
        className="NextBtn"
        onClick={() => ButtonClick('NEXT')}
      >
        <RightOutlined size={24} />
      </ButtonStyledContainer>
    </Container>
  );
};
