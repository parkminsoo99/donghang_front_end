import React, { useState } from 'react';
import { AutoComplete, Flex } from 'antd';
import type { AutoCompleteProps } from 'antd';
import styled from 'styled-components';
import {
  custom_video_register_pixel,
  custom_main_input_pixel,
} from '@/constants/size';
import { AxiosResponse } from 'axios';

import { useSearchInputStore } from '@/zustand/FoodSearchStore/InputStore';
interface CustomAutoCompleteProp {
  placeHolder?: string;
  width?: number;
  height?: number;
  customfont?: number;
  mobilefont?: number;
  query: (text: string) => Promise<AxiosResponse<any, any>>;
  readonly mobileWidth?: number;
  readonly mobileHeight?: number;
}

const AutoCompleteContainer = styled(AutoComplete)<{
  width: number;
  height: number;
  $mobilewidth: number;
  $mobileheight: number;
  $customfont?: number;
  $mobilefont?: number;
}>`
  border-radius: 10px;
  border-color: #efefef;
  background-color: #fcfcfd;
  width: ${props => props.width || 331}px !important;
  height: ${props => props.height || 60}px !important;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: ${props => props.$customfont || 18}px;
  @media (max-width: ${custom_video_register_pixel}) {
    width: ${props => props.$mobilewidth || 270}px !important;
    height: ${props => props.$mobileheight || 40}px !important;
  }
  @media (max-width: ${custom_main_input_pixel}) {
    font-size: ${props => props.$mobilefont || 15}px !important;
  }
`;

function isAxiosResponse(data: any): data is AxiosResponse<any, any> {
  return data && typeof data === 'object' && 'data' in data;
}

export const CustomAutoComplete = ({
  placeHolder,
  width,
  height,
  customfont,
  mobilefont,
  mobileHeight,
  mobileWidth,
  query,
}: CustomAutoCompleteProp) => {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const { setUserInput } = useSearchInputStore();
  const renderItem = (title: string) => ({
    value: title,
    label: (
      <Flex align="center" justify="space-between">
        {title}
      </Flex>
    ),
  });

  const getPanelValue = async (searchText: string) => {
    const keywordArray: any[] = [];
    const queryData = await query(searchText);

    if (isAxiosResponse(queryData)) {
      const returnArray = queryData.data.items;
      if (returnArray) {
        returnArray.forEach((item: any) => {
          if (item && item.title) {
            keywordArray.push(renderItem(item.title));
          }
        });
      }
    }
    return keywordArray;
  };

  const onSelect = (data: string) => {
    console.log('onSelect', data);
    setUserInput(data);
  };

  const onSearch = async (text: string) => {
    if (text) {
      const results = await getPanelValue(text);
      setOptions(results);
    } else {
      setOptions([]);
    }
  };

  return (
    <>
      <AutoCompleteContainer
        $customfont={customfont}
        $mobilefont={mobilefont}
        width={width}
        height={height}
        $mobileheight={mobileHeight}
        $mobilewidth={mobileWidth}
        options={options}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder={placeHolder}
      />
    </>
  );
};
