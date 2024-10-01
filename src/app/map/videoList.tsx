import styled from 'styled-components';
import { forwardRef } from 'react';

const Container = styled.div`
  position: relative;
  left: 0;
  z-index: 10000;
  width: 500px;
  height: 500px;
  border: 1px solid #000;
  background-color: #000;
`;

export const VideoList = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Container className="test" ref={ref}>
      123213
    </Container>
  );
});

VideoList.displayName = 'VideoList';
