'use client';
import { ThreeBars } from '@/components/atomics/Icon/threeBar';
import styled from 'styled-components';
import { CustomModal } from '@/hooks/useModal';
import { LoginForm, PinCodeForm } from '../Form/logainForm';
import { useModalContentStore } from '@/zustand/modalContentStore/modalContentStore';
import { useEffect } from 'react';
import { useMenuStore } from '@/zustand/MenuStore/MenuStore';
import { CustomMenu } from '@/components/atomics/Menu';
import {
  Add,
  Home,
  Map,
  Video,
  ProfileIcon,
  Logout,
} from '@/components/atomics/Icon';
import { DistanceFiltering } from '@/components/compounds/DistanceFiltering';
import { Font } from '@/components/atomics/Font';
import Image from 'next/image';
import Link from 'next/link';
import { VideoRegister } from '@/components/compounds/VideoRegister';
import { useModalStore } from '@/zustand/modalStore/modalStore';
import { useAuthStore } from '@/zustand/LoginStore/loginStore';
import { isNil } from 'lodash';
import {
  LogOutNotification,
  NeedToLogInNotification,
} from '../Form/loginSubmitFunction';
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

const MenuContainer = styled(Link)`
  display: inline-flex;
  align-items: center;
  width: 100px;
  gap: 15px;
  text-decoration: none;
  align-items: center;
  color: black;
`;
const VideoRegisterContainer = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100px;
  gap: 15px;
  text-decoration: none;
  align-items: center;
  color: black;
`;

export const Header = () => {
  const buttonTrigger = <ProfileIcon />;
  const { ContentArray } = useModalContentStore();
  const { setAnchorEl } = useMenuStore();
  const { openModal, setUniqueModal } = useModalStore();
  const { userToken, logout } = useAuthStore();
  const menuKey = 'header-menu';
  const videoRegisterArray = [<VideoRegister key="videoRegister" />];
  console.log('userToken', userToken);
  const VideoResiterModalOpen = () => {
    if (userToken) {
      setUniqueModal('');
      openModal(videoRegisterArray, 0);
    } else {
      NeedToLogInNotification();
    }
  };
  const onClickProFileIcon = () => {
    setUniqueModal('');
    openModal(contentArray, 0);
  };

  const titleArray = [
    <MenuContainer href="/" key="HomeMenu">
      <Home />
      <Font font={16} label="홈" />
    </MenuContainer>,
    <MenuContainer href="/map" key="MapMenu">
      <Map />
      <Font font={16} label="지도" />
    </MenuContainer>,
    <MenuContainer href="/videos" key="VideoMenu">
      <Video />
      <Font font={16} label="영상" />
    </MenuContainer>,
    <VideoRegisterContainer onClick={VideoResiterModalOpen} key="MakingMenu">
      <Add />
      <Font font={16} label="만들기" />
    </VideoRegisterContainer>,
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
    <PinCodeForm key="PinCodeForm" label="인증번호 6자리를 입력하시오." />,
    <LoginForm
      key="userForm"
      catergory="user"
      registerArray={['name', 'nickname']}
      idArray={['name', 'nickname']}
      placeholderArray={['이름', '닉네임']}
      typeArray={['text', 'nickname']}
      label="사용자 정보를 입력해주세요."
    />,
  ];

  const renderIcon = () => {
    if (isNil(userToken)) {
      return <ProfileIcon onClick={onClickProFileIcon} />;
    } else {
      return (
        <Logout
          onClick={() => {
            onClickLogoutIcon();
          }}
        />
      );
    }
  };

  useEffect(() => {
    ContentArray(contentArray);
  }, []);
  const onClickLogoutIcon = () => {
    logout();
    LogOutNotification();
  };
  return (
    <Container>
      <FilteringContainer>
        <DistanceFiltering />
      </FilteringContainer>
      <Image
        src="/images/Logo.png"
        width={80}
        height={80}
        alt="Picture of the author"
        priority
      />
      <IconContainer>
        {renderIcon()}
        <ThreeBars
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            setAnchorEl(menuKey, e)
          }
        />
        <CustomMenu titleArray={titleArray} menuKey={menuKey} />
      </IconContainer>
    </Container>
  );
};
