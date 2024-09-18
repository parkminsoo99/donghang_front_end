import styled from 'styled-components';
import { SearchIcon } from '../Icon';
import { custom_main_input_pixel } from '@/constants/size';
interface Props {
  placeHolder?: string;
  width?: number;
  height?: number;
  customfont?: number;
  mobilefont?: number;
}

const SeachContainer = styled.div<{ height: number; width: number }>`
  border-radius: 10px;
  border-color: #efefef;
  background-color: #fcfcfd;
  width: ${props => props.width || 331}px;
  height: ${props => props.height || 60}px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  @media (max-width: ${custom_main_input_pixel}) {
    width: 270px;
    height: 40px;
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
}: Props) => {
  console.log(customfont, mobilefont);
  return (
    <SeachContainer width={width} height={height}>
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
