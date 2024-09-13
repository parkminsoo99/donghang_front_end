'use client';
import { Button } from '@/components/atomics/Button';
import { useEmailInputQuery } from '@/reactQuery/Login/emailInputQuery';
import Image from 'next/image';
import styled from 'styled-components';
import { Share } from '@/components/atomics/Icon';
const NumberOfStoreContainer = styled.div`
  border-radius: 30px;
  background-color: #ffaaa4;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  color: #fff;
  align-items: center;
  position: absolute;
  top: -15px;
  right: -15px;
  z-index: 999;
`;
const MakerContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: row;
`;
const ImageMakerContainer = styled(Image)`
  z-index: 1;
`;

export default function Home() {
  const emailMutation = useEmailInputQuery();

  return (
    <>
      <Button label="계속" onClick={() => emailMutation.mutate()} />
      <MakerContainer>
        <ImageMakerContainer
          src="/images/meatPin.png"
          width={80}
          height={80}
          alt="Picture of the author"
        />
        <NumberOfStoreContainer>3</NumberOfStoreContainer>
      </MakerContainer>
      <div>
        <Share size={28} />
      </div>
    </>
  );
}
