'use client';
import { CustomSlider } from '@/components/atomics/Slider';
import { DistanceStore } from '@/zustand/DistanceStore/DistanceStore';
import { SubTitle } from '@/components/atomics/Typography';
import { Flex } from 'antd';
import { CustomePopOver } from '@/components/atomics/PopOver';
import styled from 'styled-components';

export const DistanceFiltering = () => {
  const { distanceValue } = DistanceStore();

  return (
    <>
      <SubTitle level={3} label={`${distanceValue} km`} />
      <CustomePopOver
        inputContent={<CustomSlider title="내 동네" />}
        style={{ height: '41px' }}
      />
    </>
  );
};

export const DistanceFilteringForHome = () => {
  return (
    <>
      <CustomePopOver
        inputContent={<CustomSlider title="내 동네" />}
        style={{ height: '41px' }}
      />
    </>
  );
};
