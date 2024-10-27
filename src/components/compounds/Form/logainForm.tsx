'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CustomInput } from '@/components/atomics/Input';
import { Button } from '@/components/atomics/Button';
import styled from 'styled-components';
import isNil from 'lodash/isNil';
import { Flex, Input } from 'antd';
import { SubTitle } from '@/components/atomics/Typography';
import {
  loginOnSubmit,
  userOnSubmit,
  PinCodeOnSubmit,
} from './loginSubmitFunction';
import { ReactElement } from 'react';
import { LoginFormProps } from '@/types/formProps';
import { useModalStore } from '@/zustand/modalStore/modalStore';
import { Font } from '@/components/atomics/Font';
import './form.css';
import type { GetProps } from 'antd';
import { useUserInfoStore } from '@/zustand/UserInfoStore/userInfoStore';
import {
  fetchEmailValidate,
  fetchUserRegister,
  fetchPinCodeValidate,
} from '@/reactQuery/Login/emailInputQuery';
import { useState } from 'react';
import {
  LoginSuccessNotification,
  RegisterFailNotification,
  RegisterSuccessNotification,
} from './loginSubmitFunction';
const customWidth = '420px';
const Container = styled.div`
  width: 100%;
  height: 600px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 75px;
`;
import { useClientAuthStore } from '@/hooks/useAuthStore';
import { useRouter } from 'next/navigation';
type registerString = 'name' | 'email' | 'nickname' | 'pincode';

interface InputProps {
  catergory?: string;
  idArray?: string[];
  placeholderArray?: string[];
  registerArray?: registerString[];
  typeArray?: string[];
  label?: string;
}
const FormContainer = styled.form`
  .ant-otp-input {
    padding-inline: 8px !important;
  }
`;
const FontContainer = styled(Font)`
  text-decoration: underline;
  cursor: pointer;
`;

export const LoginForm = ({
  idArray,
  placeholderArray,
  registerArray,
  label,
  catergory,
  typeArray,
}: InputProps) => {
  const inputs: ReactElement[] = [];
  const { register, handleSubmit, getValues } = useForm<LoginFormProps>();
  const { setContentIndex, nextContent } = useModalStore();
  const { closeModal } = useModalStore();
  const { email, setEmail, setName, setNickName } = useUserInfoStore();
  const { setUserToken } = useClientAuthStore();
  const functionCatergory: SubmitHandler<LoginFormProps> = async data => {
    if (catergory === 'email') {
      const result = loginOnSubmit(
        nextContent,
        setContentIndex
      )(data) as boolean;
      if (result) {
        const data = await fetchEmailValidate({
          userEmail: getValues('email'),
        });
      }
    } else if (catergory === 'user') {
      const result = userOnSubmit(nextContent, setContentIndex);
      if (result) {
        const data = await fetchUserRegister({
          email: email,
          name: getValues('name'),
          nickName: getValues('nickname'),
        });
        //회원가입 성공
        if (data.status === 201) {
          const userToken = data.headers.authorization as string;
          setUserToken(userToken);
          RegisterSuccessNotification();
        }
        //회원가입 실패
        else {
          RegisterFailNotification();
        }
      }
    }
  };
  if (
    !isNil(registerArray) &&
    !isNil(idArray) &&
    !isNil(placeholderArray) &&
    !isNil(typeArray)
  ) {
    for (let i = 0; i < registerArray.length; i++) {
      inputs.push(
        <CustomInput
          key={`${catergory}-${registerArray[i]}-${idArray[i]}-${placeholderArray[i]}-${typeArray[i]}`}
          type={typeArray[i]}
          placeholder={placeholderArray[i]}
          {...register(registerArray[i])}
        />
      );
    }
  }
  return (
    <Container>
      <SubTitle level={2} label={label} />
      <form
        onSubmit={e => {
          e.preventDefault();
          if (catergory == 'user') {
            setNickName(getValues('nickname'));
            setName(getValues('name'));
            closeModal();
          }
          if (catergory == 'email') setEmail(getValues('email'));
          handleSubmit(functionCatergory)(e);
        }}
      >
        <Flex gap={10} align="center" vertical>
          {inputs}
          <Button label="제출" />
        </Flex>
      </form>
    </Container>
  );
};

const PinInputContainer = styled(Container)`
  gap: 35px;
`;
const EmailDisplayContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: ${customWidth}) {
    flex-direction: column;
  }
`;
const CustomFontContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: ${customWidth}) {
    flex-direction: column;
  }
`;

type OTPProps = GetProps<typeof Input.OTP>;
export const PinCodeForm = ({ label }: Pick<InputProps, 'label'>) => {
  const { setContentIndex, nextContent } = useModalStore();
  const { handleSubmit } = useForm<LoginFormProps>();
  const { email } = useUserInfoStore();
  const { setUserToken } = useClientAuthStore();
  const { closeModal } = useModalStore();
  const router = useRouter();
  let inputvalue: string;
  const onChange: OTPProps['onChange'] = text => {
    inputvalue = text as string;
  };
  const functionCatergory: SubmitHandler<LoginFormProps> = async data => {
    const fetchedData = await fetchPinCodeValidate({
      userEmail: email,
      pinCode: inputvalue,
    });
    console.log('fetchedData', fetchedData);
    if (fetchedData) {
      //회원가입 안된 사용자 & but correct Pincode
      if (fetchedData.status == 303) {
        PinCodeOnSubmit(nextContent, setContentIndex, true)(data);
      }
      //회원가입 되어있는 사용자
      else if (fetchedData.status == 200) {
        const userToken = fetchedData.headers.authorization as string;
        setUserToken(userToken);
        LoginSuccessNotification();
        closeModal();
      }
      //incorrect Pincode
      else {
        PinCodeOnSubmit(nextContent, setContentIndex, false)(data);
      }
    }
  };
  const sharedProps: OTPProps = {
    onChange,
  };

  return (
    <PinInputContainer>
      <CustomFontContainer>
        <SubTitle level={2} label="인증번호 6자리를" />
        <SubTitle level={2} label="입력하시오" />
      </CustomFontContainer>
      <EmailDisplayContainer>
        <Font font={13} color="#424242" label={`${email}`} thick="bold" />
        <Font
          font={13}
          color="#4F4F4F"
          label="으로 인증번호 메일을 보냈습니다."
        />
      </EmailDisplayContainer>
      <FormContainer
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(functionCatergory)(e);
        }}
      >
        <Flex gap={10} align="center" vertical>
          <Input.OTP length={6} {...sharedProps} />
          <a href="text">
            <FontContainer
              font={13}
              color="#4F4F4F"
              label="인증번호가 오지 않았나요?"
            />
          </a>
          <Button label="제출" />
        </Flex>
      </FormContainer>
    </PinInputContainer>
  );
};
