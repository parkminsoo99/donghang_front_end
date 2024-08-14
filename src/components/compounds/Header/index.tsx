'use client';

import { ProfileIcon } from '@/components/atomics/Icon/profile';
import { ThreeBars } from '@/components/atomics/Icon/threeBar';
import styled from 'styled-components';
import { CustomModal } from '@/hooks/useModal';

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Header = () => {
  const buttonTrigger = <ProfileIcon />;
  const content = <p>하이1</p>;

  return (
    <IconContainer>
      <CustomModal
        buttonTrigger={buttonTrigger}
        title="testsubtile"
        content={content}
      />
      <ThreeBars />
    </IconContainer>
  );
};
