'use client';
import styled from 'styled-components';
import { VideoTemplate } from '@/components/compounds/VideoContainer';
const Container = styled.div`
  background-color: #000;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  height: 100%;
`;
export default function Videos() {
  return (
    <Container>
      <VideoTemplate />
    </Container>
  );
}
