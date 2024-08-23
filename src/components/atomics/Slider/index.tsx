'use client';
import { Slider } from 'antd';
import type { SliderSingleProps } from 'antd';
import styled from 'styled-components';
import { SubTitle } from '../Typography';
import { DistanceStore } from '@/zustand/DistanceStore/DistanceStore';
import { xxl, xl, lg, md, sm, xs } from '@/constants/size';
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
  height: 100px;
  width: 450px;
  padding: 30px;
  background-color: #fff;
  @media (max-width: ${xs}) {
    width: 250px;
    .ant-slider .ant-slider-mark-text {
      color: #000;
      font-size: 10px;
    }
    .ant-slider .ant-slider-mark-text-active {
      color: #fe724c;
    }
  }
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
