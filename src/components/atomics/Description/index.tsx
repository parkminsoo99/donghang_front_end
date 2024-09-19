import { Input } from 'antd';
const { TextArea } = Input;
import styled from 'styled-components';
import { custom_video_register_pixel } from '@/constants/size';
const onChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  console.log('Change:', e.target.value);
};

interface DescriptionProps {
  readonly placeHolder: string;
  readonly width: number;
  readonly height: number;
  readonly mobileWidth?: number;
  readonly mobileHeight?: number;
}
const TextAreaContainer = styled(TextArea)<{
  width: number;
  height: number;
  $mobilewidth: number;
  $mobileheight: number;
}>`
  height: ${props => props.height || 300}px;
  width: ${props => props.width || 300}px;
  resize: none;
  @media (max-width: ${custom_video_register_pixel}) {
    height: ${props => props.$mobileheight || 150}px !important;
    width: ${props => props.$mobilewidth || 150}px !important;
    resize: none;
  }
`;
export const CustomDescription = ({
  placeHolder,
  width,
  height,
  mobileHeight,
  mobileWidth,
}: DescriptionProps) => (
  <>
    <TextAreaContainer
      showCount
      maxLength={300}
      onChange={onChange}
      placeholder={placeHolder}
      height={height}
      width={width}
      $mobileheight={mobileHeight}
      $mobilewidth={mobileWidth}
    />
  </>
);
