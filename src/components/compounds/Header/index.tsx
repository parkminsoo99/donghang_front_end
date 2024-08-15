'use client';

import { ProfileIcon } from '@/components/atomics/Icon/profile';
import { ThreeBars } from '@/components/atomics/Icon/threeBar';
import styled from 'styled-components';
import { CustomModal } from '@/hooks/useModal';
import { Form } from '../Form';
const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Header = () => {
  const buttonTrigger = <ProfileIcon />;
  const content = (
    <Form
      catergory="email"
      registerArray={['email']}
      idArray={['email']}
      placeholderArray={['이메일']}
      typeArray={['text']}
      label="이메일을 입력해주세요."
    />
  );
  const content2 = (
    <Form
      catergory="user"
      registerArray={['name', 'nickname', 'registerPassword']}
      idArray={['name', 'nickname', 'password']}
      placeholderArray={['이름', '닉네임', '비밀번호']}
      typeArray={['text', 'nickname', 'password']}
      label="사용자 정보를 입력해주세요."
    />
  );
  const content3 = (
    <Form
      catergory="password"
      registerArray={['loginPassword']}
      idArray={['password']}
      placeholderArray={['비밀번호']}
      typeArray={['password']}
      label="비밀번호를 입력해주세요."
    />
  );
  return (
    <IconContainer>
      <CustomModal buttonTrigger={buttonTrigger} content={content} />
      <CustomModal buttonTrigger={buttonTrigger} content={content2} />
      <CustomModal buttonTrigger={buttonTrigger} content={content3} />
      <ThreeBars />
    </IconContainer>
  );
};
