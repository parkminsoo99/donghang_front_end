'use client';
import { Slider } from 'antd';
import type { SliderSingleProps } from 'antd';
import styled from 'styled-components';
import { SubTitle } from '../Typography';
import { DistanceStore } from '@/zustand/DistanceStore/DistanceStore';
interface SliderProps {
  title: string;
}
const Container = styled.div`
  .ant-slider .ant-slider-mark-text {
    color: #000;
  }
  .ant-slider .ant-slider-mark-text-active {
    color: #fe724c;
  }
  height: 200px;
  width: 500px;
  padding: 10px;
  background-color: #fff;
`;
const marks: SliderSingleProps['marks'] = {
  0.5: '0.5km',
  1.0: '1km',
  1.5: '1.5km',
  2.0: '2km',
  2.5: '2.5km',
  3.0: '3km',
  3.5: '3.5km',
  4.0: '4.0km',
};

export const CustomSlider = ({ title }: SliderProps) => {
  const { distanceValue, setDistanceValue } = DistanceStore();
  console.log(distanceValue);
  return (
    <Container>
      <SubTitle level={2} label={title} />
      <Slider
        marks={marks}
        step={null}
        defaultValue={0.5}
        max={4}
        min={0.5}
        value={distanceValue}
        onChange={setDistanceValue}
      />
    </Container>
  );
};
