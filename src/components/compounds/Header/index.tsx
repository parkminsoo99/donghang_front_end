'use client';

import { ProfileIcon } from '@/components/atomics/Icon/profile';
import { ThreeBars } from '@/components/atomics/Icon/threeBar';
import styled from 'styled-components';
import { CustomModal } from '@/hooks/useModal';
import { Form } from '../Form';
import { useModalContentStore } from '@/zustand/modalContentStore/modalContentStore';
import { useEffect } from 'react';
import { MenuStore } from '@/zustand/MenuStore/MenuStore';
import { CustomMenu } from '@/components/atomics/Menu';
import { Add, Home, Map, Video } from '@/components/atomics/Icon';
const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MenuContainer = styled(IconContainer)`
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
    <Form
      key="emailForm"
      catergory="email"
      registerArray={['email']}
      idArray={['email']}
      placeholderArray={['이메일']}
      typeArray={['text']}
      label="이메일을 입력해주세요."
    />,
    <Form
      key="passwordForm"
      catergory="password"
      registerArray={['loginPassword']}
      idArray={['password']}
      placeholderArray={['비밀번호']}
      typeArray={['password']}
      label="비밀번호를 입력해주세요."
    />,
    <Form
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
    <IconContainer>
      <CustomModal buttonTrigger={buttonTrigger} content={contentArray} />
      <ThreeBars
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e)}
      />
      <CustomMenu titleArray={titleArray} />
    </IconContainer>
  );
};
