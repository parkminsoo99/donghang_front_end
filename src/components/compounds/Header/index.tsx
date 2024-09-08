'use client';

import { ProfileIcon } from '@/components/atomics/Icon/profile';
import { ThreeBars } from '@/components/atomics/Icon/threeBar';
import styled from 'styled-components';
import { CustomModal } from '@/hooks/useModal';
import { LoginForm } from '../Form';
import { useModalContentStore } from '@/zustand/modalContentStore/modalContentStore';
import { useEffect } from 'react';
import { MenuStore } from '@/zustand/MenuStore/MenuStore';
import { CustomMenu } from '@/components/atomics/Menu';
import { Add, Home, Map, Video } from '@/components/atomics/Icon';
import { DistanceFiltering } from '@/components/compounds/DistanceFiltering';
import Image from 'next/image';

const Container = styled.div`
  display: flex;
  padding-left: 12px;
  padding-right: 12px;
  margin-top: 34px;
  margin-bottom: 34px;
  align-items: center;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  justify-content: center;
  width: 85px;
  height: 40px;
  border: 0.5px solid #4f4f4f;
  &:hover {
    box-shadow: 1px 1px 1px #4f4f4f;
  }
`;

const FilteringContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuContainer = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100px;
  gap: 15px;
`;
export const Header = () => {
  const buttonTrigger = <ProfileIcon />;
  const { ContentArray } = useModalContentStore();
  const { setAnchorEl } = MenuStore();
  const titleArray = [
    <MenuContainer key="HomeMenu">
      <Home />홈
    </MenuContainer>,
    <MenuContainer key="MapMenu">
      <Map />
      지도
    </MenuContainer>,
    <MenuContainer key="VideoMenu">
      <Video />
      영상
    </MenuContainer>,
    <MenuContainer key="MakingMenu">
      <Add />
      만들기
    </MenuContainer>,
  ];
  const contentArray = [
    <LoginForm
      key="emailForm"
      catergory="email"
      registerArray={['email']}
      idArray={['email']}
      placeholderArray={['이메일']}
      typeArray={['text']}
      label="이메일을 입력해주세요."
    />,
    <LoginForm
      key="passwordForm"
      catergory="password"
      registerArray={['loginPassword']}
      idArray={['password']}
      placeholderArray={['비밀번호']}
      typeArray={['password']}
      label="비밀번호를 입력해주세요."
    />,
    <LoginForm
      key="userForm"
      catergory="user"
      registerArray={['name', 'nickname', 'registerPassword']}
      idArray={['name', 'nickname', 'password']}
      placeholderArray={['이름', '닉네임', '비밀번호']}
      typeArray={['text', 'nickname', 'password']}
      label="사용자 정보를 입력해주세요."
    />,
  ];

  useEffect(() => {
    ContentArray(contentArray);
  }, []);

  return (
    <Container>
      <FilteringContainer>
        <DistanceFiltering />
      </FilteringContainer>
      <Image
        src="/images/betaLogo.png"
        width={80}
        height={80}
        alt="Picture of the author"
        priority
      />
      <IconContainer>
        <CustomModal buttonTrigger={buttonTrigger} content={contentArray} />
        <ThreeBars
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e)}
        />
        <CustomMenu titleArray={titleArray} />
      </IconContainer>
    </Container>
  );
};
