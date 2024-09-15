import styled from 'styled-components';
import { SearchIcon } from '../Icon';
import { custom_main_input_pixel } from '@/constants/size';
interface Props {
  placeHolder?: string;
}

const SeachContainer = styled.div`
  border-radius: 10px;
  border-color: #efefef;
  background-color: #fcfcfd;
  width: 331px;
  height: 60px;
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

const InputContainer = styled.input`
  border-color: #fff;
  border: 0;
  padding-left: 10px;
  width: 100%;
  height: 100%;
  border-width: 0;
  background-color: #fcfcfd;
  font-size: 18px;
  padding: 0;
  &:focus {
    outline: none;
  }
  @media (max-width: ${custom_main_input_pixel}) {
    font-size: 15px;
  }
`;
export const Search = ({ placeHolder }: Props) => {
  return (
    <SeachContainer>
      <InSeachContainer>
        <SearchIcon IconColor="#767F9D" />
        <InputContainer type="text" placeholder={placeHolder} max={20} />
      </InSeachContainer>
    </SeachContainer>
  );
};
