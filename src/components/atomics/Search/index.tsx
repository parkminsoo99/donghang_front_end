import styled from 'styled-components';
import { SearchIcon } from '../Icon';
import {
  custom_main_input_pixel,
  custom_video_register_pixel,
} from '@/constants/size';
interface Props {
  placeHolder?: string;
  width?: number;
  height?: number;
  customfont?: number;
  mobilefont?: number;
  readonly mobileWidth?: number;
  readonly mobileHeight?: number;
}

const SeachContainer = styled.div<{
  width: number;
  height: number;
  $mobilewidth: number;
  $mobileheight: number;
}>`
  border-radius: 10px;
  border-color: #efefef;
  background-color: #fcfcfd;
  width: ${props => props.width || 331}px;
  height: ${props => props.height || 60}px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  @media (max-width: ${custom_video_register_pixel}) {
    width: ${props => props.$mobilewidth || 270}px;
    height: ${props => props.$mobileheight || 40}px;
  }
`;

const InSeachContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.input<{
  $customfont?: number;
  $mobilefont?: number;
}>`
  border-color: #fff;
  border: 0;
  padding-left: 10px;
  width: 100%;
  height: 100%;
  border-width: 0;
  background-color: #fcfcfd;
  font-size: ${props => props.$customfont || 18}px;
  padding: 0;
  &:focus {
    outline: none;
  }
  @media (max-width: ${custom_main_input_pixel}) {
    font-size: ${props => props.$mobilefont || 15}px;
  }
`;

export const Search = ({
  placeHolder,
  width,
  height,
  customfont,
  mobilefont,
  mobileHeight,
  mobileWidth,
}: Props) => {
  console.log(customfont, mobilefont);
  return (
    <SeachContainer
      width={width}
      height={height}
      $mobileheight={mobileHeight}
      $mobilewidth={mobileWidth}
    >
      <InSeachContainer>
        <SearchIcon IconColor="#767F9D" />
        <InputContainer
          type="text"
          $customfont={customfont}
          $mobilefont={mobilefont}
          placeholder={placeHolder}
          max={20}
        />
      </InSeachContainer>
    </SeachContainer>
  );
};
