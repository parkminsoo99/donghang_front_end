import styled from 'styled-components';
import Image from 'next/image';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { foodLists } from '@/constants/foodLists';
import {
  custom_video_register_pixel,
  custom_map_side_bar_pixel_large,
  custom_map_side_bar_pixel_medium,
  custom_map_side_bar_pixel_small,
} from '@/constants/size';

const foodList = foodLists;
interface Props {
  src: string;
  alt: string;
  label: string;
  style?: CSSProperties;
  marginvalue?: number;
  mobilemarginvalue?: number;
  paddingvalue?: number;
  gapvalue?: number;
}
const DEFAULT_TOTAL_VALUE = 1900;
const FoodFilteringContainer = styled.div<{ paddingvalue: number }>`
  display: inline-block;
  border-radius: 40px;
  flex-shrink: 0;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 10px 25px;
  &:hover {
    color: #fff;
    border: 1px solid #f4eae0;
    background-color: #f3dfc8;
  }
  @media (max-width: ${custom_video_register_pixel}) {
    padding: 10px ${props => props.paddingvalue || 25}px;
  }
`;

const FoodFlexContainer = styled.div<{ gapvalue: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  @media (max-width: ${custom_video_register_pixel}) {
    gap: ${props => props.gapvalue || 8}px;
  }
`;

const FoodDescriptionContainer = styled.p<{
  $marginvalue: number;
  $mobilemarginvalue: number;
}>`
  font-size: 20px;
  font-weight: bold;
  margin: ${props => props.$marginvalue || 20}px 0;
  @media (max-width: ${custom_video_register_pixel}) {
    margin: ${props => props.$mobilemarginvalue || 20}px 0;
  }
`;

const ButtonStyledContainer = styled.button`
  display: inline-block;
  position: relative !important;
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
const LabelContainer = styled.p`
  box-sizing: content-box;
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;

export const MapFood: FC<Props> = ({
  src,
  alt,
  label,
  style,
  marginvalue,
  mobilemarginvalue,
  paddingvalue,
  gapvalue,
}) => {
  return (
    <FoodFilteringContainer
      paddingvalue={paddingvalue}
      className={alt}
      style={style}
    >
      <FoodFlexContainer gapvalue={gapvalue}>
        <Image src={`/images/${src}`} width={24} height={24} alt={alt} />
        <FoodDescriptionContainer
          $marginvalue={marginvalue}
          $mobilemarginvalue={mobilemarginvalue}
        ></FoodDescriptionContainer>
        <LabelContainer>{label}</LabelContainer>
      </FoodFlexContainer>
    </FoodFilteringContainer>
  );
};

const Container = styled.div<{ $isSideBarShow: boolean }>`
  padding: 0 20px;
  display: flex;
  justify-content: center;
  top: 15px;
  position: relative;
  align-items: center;
  gap: 14px;
  width: ${props => (props.$isSideBarShow ? '80%' : '95%')};
  ${props =>
    props.$isSideBarShow &&
    `
    @media (max-width: ${custom_map_side_bar_pixel_large}){
      width: 75%;
    }
    @media (max-width: ${custom_map_side_bar_pixel_medium}){
      width: 70%;
    }
    @media (max-width: ${custom_map_side_bar_pixel_small}){
      width: 47%;
    }
  `}
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
      positions.push(DEFAULT_TOTAL_VALUE - width + 160);
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
interface MapFoodFilteringProps {
  isSideBarShow: boolean;
}
export const MapFoodFiltering: FC<MapFoodFilteringProps> = ({
  isSideBarShow,
}) => {
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
    <Container
      $isSideBarShow={isSideBarShow}
      ref={targetRef}
      className="Container"
    >
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
