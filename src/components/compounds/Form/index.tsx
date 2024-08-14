'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/atomics/Input';
import { Button } from '@/components/atomics/Button';
import styled from 'styled-components';
import { emailError } from './formVerification';
import isNil from 'lodash/isNil';
import customNotification from '@/components/atomics/Notification';
import { Flex } from 'antd';
const Container = styled.div`
  width: 200px;
  height: 100px;
`;
interface LoginFormProps {
  email?: string;
}

interface PasswordFormProps {
  password: string;
}

interface RegisterFormProps {
  name: string;
  nickname: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormProps>();

  const onSubmit: SubmitHandler<LoginFormProps> = data => {
    console.log(data);
    const emailData = emailError(data.email);
    console.log(emailData);
    if (!isNil(emailData.errorDescription)) {
      customNotification({
        message: emailData.errorDescription,
        placement: 'top',
        type: 'error',
      });
    }
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={10} align="center" vertical>
          <Input
            id="email"
            type="text"
            placeholder="이메일 입력"
            {...register('email')}
          />
          <Button label="확인" />
        </Flex>
      </form>
    </Container>
  );
};

// export const Regsiter = () => {
//   const { register, handleSubmit } = useForm<RegisterProps>;
// };
