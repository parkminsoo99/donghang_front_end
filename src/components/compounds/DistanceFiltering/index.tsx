'use client';
import { CustomSlider } from '@/components/atomics/Slider';
import { DistanceStore } from '@/zustand/DistanceStore/DistanceStore';
import { SubTitle } from '@/components/atomics/Typography';
import { Flex } from 'antd';
import { CustomPopOver } from '@/components/atomics/PopOver';
import styled from 'styled-components';
import './DistanceFiltering.css';
export const DistanceFiltering = () => {
  const { distanceValue } = DistanceStore();

  return (
    <>
      <SubTitle level={3} label={`${distanceValue} km`} />
      <CustomPopOver
        inputContent={<CustomSlider title="내 동네" />}
        style={{ height: '41px' }}
      />
    </>
  );
};

export const DistanceFilteringForHome = () => {
  return (
    <>
      <CustomPopOver
        inputContent={<CustomSlider title="내 동네" />}
        style={{ height: '41px' }}
      />
    </>
  );
};
