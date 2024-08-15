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
} from './submitFunction';
import { ReactElement } from 'react';
import { FormProps } from '@/types/formProps';
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

export const Form = ({
  idArray,
  placeholderArray,
  registerArray,
  label,
  catergory,
  typeArray,
}: InputProps) => {
  const inputs: ReactElement[] = [];
  const { register, handleSubmit } = useForm<FormProps>();

  let functionCatergory: SubmitHandler<FormProps> = loginOnSubmit;
  if (catergory === 'email') functionCatergory = loginOnSubmit;
  else if (catergory === 'user') functionCatergory = userOnSubmit;
  else if (catergory === 'password') functionCatergory = passwordOnSubmit;

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
      <form onSubmit={handleSubmit(functionCatergory)}>
        <Flex gap={10} align="center" vertical>
          {inputs}
          <Button label="확인" />
        </Flex>
      </form>
    </Container>
  );
};
