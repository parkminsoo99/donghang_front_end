'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/atomics/Input';
import { Button } from '@/components/atomics/Button';
import styled from 'styled-components';
import isNil from 'lodash/isNil';
import { Flex } from 'antd';
import { SubTitle } from '@/components/atomics/Typography';
import {
  loginOnSubmit,
  userOnSubmit,
  passwordOnSubmit,
} from './loginSubmitFunction';
import { ReactElement } from 'react';
import { LoginFormProps } from '@/types/formProps';
import { useModalStore } from '@/zustand/modalStore/modalStore';

const Container = styled.div`
  width: 100%;
  height: 600px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 75px;
`;

type registerString =
  | 'name'
  | 'email'
  | 'registerPassword'
  | 'loginPassword'
  | 'nickname';

interface InputProps {
  catergory: string;
  idArray: string[];
  placeholderArray: string[];
  registerArray: registerString[];
  typeArray: string[];
  label: string;
}

export const LoginForm = ({
  idArray,
  placeholderArray,
  registerArray,
  label,
  catergory,
  typeArray,
}: InputProps) => {
  const inputs: ReactElement[] = [];
  const { register, handleSubmit } = useForm<LoginFormProps>();
  const { setContentIndex, nextContent } = useModalStore();
  let functionCatergory: SubmitHandler<LoginFormProps> = loginOnSubmit(
    nextContent,
    setContentIndex
  );

  if (catergory === 'email') {
    functionCatergory = loginOnSubmit(nextContent, setContentIndex);
  } else if (catergory === 'user') {
    functionCatergory = userOnSubmit(nextContent, setContentIndex);
  } else if (catergory === 'password') {
    functionCatergory = passwordOnSubmit(nextContent, setContentIndex);
  }

  if (
    !isNil(registerArray) &&
    !isNil(idArray) &&
    !isNil(placeholderArray) &&
    !isNil(typeArray)
  ) {
    for (let i = 0; i < registerArray.length; i++) {
      inputs.push(
        <Input
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
