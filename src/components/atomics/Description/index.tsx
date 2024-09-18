import { FC } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

const onChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  console.log('Change:', e.target.value);
};

interface DescriptionProps {
  readonly width: number;
  readonly height: number;
  readonly placeHolder: string;
}
export const CustomDescription = ({
  width,
  height,
  placeHolder,
}: DescriptionProps) => (
  <>
    <TextArea
      showCount
      maxLength={300}
      onChange={onChange}
      placeholder={placeHolder}
      style={{ height: height, width: width, resize: 'none' }}
    />
  </>
);
