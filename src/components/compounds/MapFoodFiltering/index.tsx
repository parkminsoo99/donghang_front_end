import styled from 'styled-components';
import Image from 'next/image';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { foodLists } from '@/constants/foodLists';
import { custom_video_register_pixel } from '@/constants/size';
import CustomNotification from '@/components/atomics/Notification';
import { foodListHastTable } from '@/constants/foodLists';
import { useMyPositionStore } from '@/zustand/MyPositionStore/myPositionStore';
import { DistanceStore } from '@/zustand/DistanceStore/DistanceStore';
import { fetchGetRestaurantsByFiltering } from '@/reactQuery/NaverMap/naverGetRestaurantsByFiltering';
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
  isModal?: boolean;
  setPinArrayReal?: (PinArrayReal: any[]) => void;
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
  z-index: 999;
  cursor: pointer;
  &:hover {
    color: #fff;
    border: 1px solid #f4eae0;
    background-color: #f3dfc8;
  }
  &.active {
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
  isModal = false,
  setPinArrayReal,
}) => {
  const { LatLng } = useMyPositionStore();
  const { distanceValue, setDistanceValue } = DistanceStore();
  let lat: number;
  let lng: number;
  const retrunFetchFoodFliteringData = () => {
    const returnFoodList = Array.from(document.querySelectorAll('.active')).map(
      value => {
        const kindofFood = value.className.split(' ');
        const foodItem = foodListHastTable[kindofFood[2]];
        return foodItem;
      }
    ) as string[];
    if (LatLng) {
      lat = LatLng.lat;
      lng = LatLng.lng;
    } else {
      lat = 37.5665;
      lng = 126.978;
    }

    return { returnFoodList };
  };
  const onClickFoodTag = async () => {
    //모달에 있는 푸드리스트
    if (isModal) {
      const foodTagClassName = document.querySelector(`.modal-${alt}`);
      const activeElements = document.querySelectorAll('.active');
      if (foodTagClassName.classList.contains('active'))
        foodTagClassName.classList.remove('active');
      else if (activeElements.length <= 0) {
        foodTagClassName.classList.add('active');
      } else {
        CustomNotification({
          placement: 'top',
          message: '태그는 하나만 지정 가능합니다.',
          type: 'warning',
        });
      }
      //모달에 없는 푸드 리스트 즉, 맵 푸드리스트
    } else {
      const foodTagClassName = document.querySelector(`.${alt}`);
      if (foodTagClassName.classList.contains('active')) {
        foodTagClassName.classList.remove('active');
        const foodItems = retrunFetchFoodFliteringData();
        const data = await fetchGetRestaurantsByFiltering({
          lat: lat,
          lng: lng,
          distance: distanceValue,
          foodList: foodItems.returnFoodList,
        });
        const filteredData: [] = data.data;
        setPinArrayReal(filteredData);
      } else {
        foodTagClassName.classList.add('active');
        const foodItems = retrunFetchFoodFliteringData();
        const data = await fetchGetRestaurantsByFiltering({
          lat: lat,
          lng: lng,
          distance: distanceValue,
          foodList: foodItems.returnFoodList,
        });
        const filteredData: [] = data.data;
        setPinArrayReal(filteredData);
      }
    }
  };
  return (
    <FoodFilteringContainer
      paddingvalue={paddingvalue}
      className={isModal ? `modal-${alt}` : alt}
      style={style}
      onClick={onClickFoodTag}
    >
      <FoodFlexContainer className="inner-container" gapvalue={gapvalue}>
        <Image src={`/images/${src}`} width={24} height={24} alt={alt} />
        <FoodDescriptionContainer
          $marginvalue={marginvalue}
          $mobilemarginvalue={mobilemarginvalue}
        ></FoodDescriptionContainer>
        <LabelContainer className="tag-description">{label}</LabelContainer>
      </FoodFlexContainer>
    </FoodFilteringContainer>
  );
};

const Container = styled.div<{ $open: boolean; $drawerWidth: number }>`
  padding: 0 20px;
  display: flex;
  justify-content: center;
  top: 15px;
  position: relative;
  align-items: center;
  width: 100% !important;
  gap: 14px;
  z-index: 555;
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
      positions.push(DEFAULT_TOTAL_VALUE - width + 215);
      count++;
      break;
    }
    positions.push(pixel);
    count++;
  }
  setPosition(positions);
  setItemCount(count);
  setCurrentIdx(0);
};

type totalFoodContainerType = HTMLDivElement;
interface MapFoodFilteringProps {
  open: boolean;
  drawerWidth: number;
  setPinArrayReal: (PinArrayReal: any[]) => void;
}
export const MapFoodFiltering: FC<MapFoodFilteringProps> = ({
  open,
  drawerWidth,
  setPinArrayReal,
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
      $open={open}
      ref={targetRef}
      $drawerWidth={drawerWidth}
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
              setPinArrayReal={setPinArrayReal}
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
