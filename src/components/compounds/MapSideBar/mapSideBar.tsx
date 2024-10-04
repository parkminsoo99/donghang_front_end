'use client';
import { Position } from '@/components/atomics/Icon';
import { CustomAutoComplete } from '@/components/atomics/AutoComplete';
import styled from 'styled-components';
import { fetchAddress } from '@/reactQuery/Search/addressSearch';
import { VideoItem } from './videoItem';
import { FC } from 'react';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';
import {
  custom_map_side_bar_pixel_medium,
  custom_map_side_bar_pixel_small,
  custom_map_side_bar_pixel_large,
} from '@/constants/size';

const Container = styled.div`
  width: 100%;
`;
const CustomAutoCompleteContainer = styled.div`
  padding: 10px;
  width: 90%;
  @media (max-width: ${custom_map_side_bar_pixel_large}) {
    width: 85%;
  }
`;
const VideoItemsContainer = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  z-index: 9999999;
`;
type MyComponentProps = React.HTMLProps<HTMLDivElement> & {
  isShow: boolean;
};

export const MapSideBar: FC<MyComponentProps> = ({ className, isShow }) => {
  const temp_array = [
    {
      name: '엽기떡볶이1',
      tag: '한식',
      description: '너무 맜있어요.',
      numberOfHeart: 312,
    },
    {
      name: '엽기떡볶이1',
      tag: '분식',
      description: '너무 맜있어요.',
      numberOfHeart: 123,
    },
    {
      name: '엽기떡볶이1',
      tag: '분식',
      description: '너무 맜있어요.',
      numberOfHeart: 123,
    },
    {
      name: '엽기떡볶이1',
      tag: '분식',
      description: '너무 맜있어요.',
      numberOfHeart: 123,
    },
    {
      name: '엽기떡볶이1',
      tag: '분식',
      description: '너무 맜있어요.',
      numberOfHeart: 123,
    },
  ];
  const IterationItem = () => {
    const ItemArray = [];
    for (let i = 0; i < temp_array.length; i++) {
      ItemArray.push(
        <VideoItem
          tag={temp_array[i].tag}
          name={temp_array[i].name}
          description={temp_array[i].description}
          numberOfHeart={temp_array[i].numberOfHeart}
          key={`ItemArray-${i}`}
        />
      );
    }
    return ItemArray;
  };

  return (
    <>
      <Collapse orientation="horizontal" in={isShow}>
        <Container className={className}>
          <CustomAutoCompleteContainer>
            <CustomAutoComplete
              height={40}
              customfont={12}
              mobilefont={12}
              mobileHeight={40}
              query={fetchAddress}
              placeHolder="주소 검색"
            />
          </CustomAutoCompleteContainer>
          <VideoItemsContainer>{IterationItem()}</VideoItemsContainer>
        </Container>
      </Collapse>
    </>
  );
};
