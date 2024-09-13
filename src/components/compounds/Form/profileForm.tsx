'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/atomics/Input';
import { Button } from '@/components/atomics/Button';
import styled from 'styled-components';
import isNil from 'lodash/isNil';
import { Flex, Upload, message } from 'antd';
import { Font } from '@/components/atomics/Font';
import { ReactElement } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ProfileFormProps } from '@/types/formProps';
import type { GetProp, UploadProps } from 'antd';
import { useState } from 'react';

const Container = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
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
`;
const InputWithDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 45px;
`;
const DescriptionAndInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  align-items: start;
  justify-content: center;
`;
const FontContainer = styled.div`
  padding-top: 6px;
  width: 60px;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.form`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const ProfileForm = ({
  idArray,
  placeholderArray,
  registerArray,
  typeArray,
  sideFont,
}: InputProps) => {
  const inputs: ReactElement[] = [];
  const { register, handleSubmit } = useForm<ProfileFormProps>();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

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
            <Font font={16} label={placeholderArray[i]} thick="bold" />
          </FontContainer>
          <InputContainer className="InputContainer">
            <Input
              key={`${registerArray[i]}-${idArray[i]}-${placeholderArray[i]}-${typeArray[i]}`}
              type={typeArray[i]}
              placeholder={placeholderArray[i]}
              {...register(registerArray[i])}
              width={300}
              borderRadius={3}
              height={32}
            />
            {sideFont[i] && (
              <Font font={11} label={sideFont[i]} color="#8E8E8E" />
            )}
          </InputContainer>
        </DescriptionAndInputContainer>
      );
    }
  }
  return (
    <Container>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="custom-upload"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        maxCount={1}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
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
