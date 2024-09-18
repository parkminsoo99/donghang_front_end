'use client';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';
import { useState } from 'react';
import './upload.css';
import styled from 'styled-components';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type listTypeType = 'picture-card' | 'picture-circle' | 'picture' | undefined;
interface CustomUploadProps {
  listType?: listTypeType;
  maxCount?: number;
  fileType?: string[];
  action?: string;
  width?: number;
  height?: number;
}
const UploadContainer = styled(Upload)<{ width: number; height: number }>`
  .ant-upload.ant-upload-select {
    width: ${props => props.width || 150}px !important;
    height: ${props => props.height || 150}px !important;
  }
`;

export const CustomUpload = ({
  listType,
  fileType,
  maxCount,
  action,
  width,
  height,
}: CustomUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
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

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <UploadContainer
      name="avatar"
      listType={listType}
      className="custom-upload"
      showUploadList={false}
      action={action}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      maxCount={maxCount || 1}
      width={width}
      height={height}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </UploadContainer>
  );
};
