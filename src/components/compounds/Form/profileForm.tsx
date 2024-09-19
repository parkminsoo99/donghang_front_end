'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CustomInput } from '@/components/atomics/Input';
import { Button } from '@/components/atomics/Button';
import styled from 'styled-components';
import isNil from 'lodash/isNil';
import { Font } from '@/components/atomics/Font';
import { ReactElement } from 'react';
import { ProfileFormProps } from '@/types/formProps';
import { CustomUpload } from '@/components/atomics/CustomUpload';
import { xs } from '@/constants/size';
const Container = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 0;
`;

type registerString =
  | 'profileName'
  | 'profileNickName'
  | 'profileWebSite'
  | 'profileIntroduction';

interface InputProps {
  idArray: string[];
  placeholderArray: string[];
  registerArray: registerString[];
  typeArray: string[];
  sideFont: string[];
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 14px;
  width: 100%;
`;

const InputWithDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const DescriptionAndInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  align-items: start;
  justify-content: center;
  @media (max-width: ${xs}) {
    gap: 5px;
  }
`;
const FontContainer = styled.div`
  padding-top: 6px;
  width: 100px;
  align-items: center;
  display: flex;
  justify-content: center;
  @media (max-width: ${xs}) {
    width: 60px;
  }
`;

const FormContainer = styled.form`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const ProfileForm = ({
  idArray,
  placeholderArray,
  registerArray,
  typeArray,
  sideFont,
}: InputProps) => {
  const inputs: ReactElement[] = [];
  const { register, handleSubmit } = useForm<ProfileFormProps>();

  if (
    !isNil(registerArray) &&
    !isNil(idArray) &&
    !isNil(placeholderArray) &&
    !isNil(typeArray)
  ) {
    for (let i = 0; i < registerArray.length; i++) {
      inputs.push(
        <DescriptionAndInputContainer key={i}>
          <FontContainer>
            <Font
              mobilefont={13}
              font={16}
              label={placeholderArray[i]}
              thick="bold"
            />
          </FontContainer>
          <InputContainer className="InputContainer">
            <CustomInput
              key={`${registerArray[i]}-${idArray[i]}-${placeholderArray[i]}-${typeArray[i]}`}
              type={typeArray[i]}
              placeholder={placeholderArray[i]}
              {...register(registerArray[i])}
              width={300}
              borderRadius={3}
              height={32}
              mobileheight={32}
              mobilewidth={200}
            />
            {sideFont[i] && (
              <Font
                mobilefont={7}
                font={11}
                label={sideFont[i]}
                color="#8E8E8E"
              />
            )}
          </InputContainer>
        </DescriptionAndInputContainer>
      );
    }
  }
  return (
    <Container>
      <CustomUpload
        listType="picture-circle"
        maxCount={1}
        action="test"
        width={150}
        height={150}
      />
      <FormContainer
        onSubmit={e => {
          e.preventDefault();
          //   handleSubmit(functionCatergory)(e);
        }}
      >
        <InputWithDescriptionContainer className="InputWithDescriptionContainer">
          {inputs}
        </InputWithDescriptionContainer>
        <Button label="제출" width={120} />
      </FormContainer>
    </Container>
  );
};
