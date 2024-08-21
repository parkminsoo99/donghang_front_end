import { ReactNode, useState } from 'react';
import { Popover } from 'antd';
import { Filter } from '../Icon/filter';
import { Button } from '../Button';
import styled from 'styled-components';
interface PopOverProps {
  inputContent?: JSX.Element | null | ReactNode;
}

const ContentContiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const CustomePopOver = ({ inputContent }: PopOverProps) => {
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
        <ContentContiner>
          {inputContent}
          <Button label="Close" onClick={hide} />
        </ContentContiner>
      }
      title={null}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Filter />
    </Popover>
  );
};
