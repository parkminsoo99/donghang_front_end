import { CSSProperties, ReactNode, useState } from 'react';
import { Popover } from 'antd';
import { Filter } from '../Icon/filter';
import { Button } from '../Button';
import styled from 'styled-components';
import { xs } from '@/constants/size';
interface PopOverProps {
  inputContent?: JSX.Element | null | ReactNode;
  style?: CSSProperties;
}

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 500px;
  padding: 15px;
  box-sizing: border-box;
  overflow: auto;
  @media (max-width: ${xs}) {
    width: 300px;
  }
`;

export const CustomePopOver = ({ inputContent, style }: PopOverProps) => {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={
        <ContentContainer>
          {inputContent}
          <Button label="Close" onClick={hide} />
        </ContentContainer>
      }
      title={null}
      trigger="click"
      style={style}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Filter />
    </Popover>
  );
};
