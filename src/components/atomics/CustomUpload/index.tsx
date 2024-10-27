'use client';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';
import { useState } from 'react';
import './upload.css';
import styled from 'styled-components';
import { custom_video_register_pixel } from '@/constants/size';
import { DeleteIcon } from '../Icon/delete';
import CustomNotification from '../Notification';
import { fetchVideoUpload } from '@/reactQuery/VideoRegister/videoUpload';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type listTypeType = 'picture-card' | 'picture-circle' | 'picture' | undefined;
interface CustomUploadProps {
  listType?: listTypeType;
  maxCount?: number;
  fileType?: string[];
  action?: string;
  width?: number;
  height?: number;
  mobileWidth?: number;
  mobileHeight?: number;
  videoUrl?: string;
  setVideoUrl?: (url: string) => void;
  token: string;
}
const UploadContainer = styled(Upload)<{
  width: number;
  height: number;
  $mobilewidth: number;
  $mobileheight: number;
}>`
  .ant-upload {
    width: 100% !important;
    height: 100% !important;
  }
  .ant-upload.ant-upload-select {
    width: ${props => props.width || 150}px !important;
    height: ${props => props.height || 150}px !important;
  }
  .ant-upload.ant-upload-select.ant-upload {
    width: inherit;
    height: inherit;
  }
  @media (max-width: ${custom_video_register_pixel}) {
    .ant-upload.ant-upload-select {
      width: ${props => props.$mobilewidth || 150}px !important;
      height: ${props => props.$mobileheight || 150}px !important;
    }
  }
`;
const VideoContainer = styled.video`
  width: 100% !important;
  height: 100% !important;
  z-index: 9;
  object-fit: fill !important;
`;
const DeleteIconContainer = styled.div`
  position: absolute;
  top: 5px;
  box-sizing: content-box;
  right: 5px;
  z-index: 10;
`;

const Container = styled.div`
  position: relative;
  object-fit: fill !important;
  height: 100%;
`;
export const CustomUpload = ({
  listType,
  fileType,
  maxCount,
  action = '/api/video/upload',
  width,
  height,
  mobileWidth,
  mobileHeight,
  videoUrl,
  setVideoUrl,
  token,
}: CustomUploadProps) => {
  const [loading, setLoading] = useState(false);
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
      setVideoUrl(info.file.response.data.url);
      setLoading(false);
    }
  };
  const onClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const res = await fetchVideoUpload({
      method: 'delete',
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/delete?url=${videoUrl}`,
      token: token,
    });
    if (res.status === 200) {
      CustomNotification({
        message: res.data,
        placement: 'top',
        type: 'success',
      });
      setVideoUrl(null);
    }
    console.log(res);
  };

  // const beforeUpload = (file: FileType) => {
  //   const isJpgOrPng = file.type === 'video/mp4' || file.type === 'image/png';
  //   if (!isJpgOrPng) {
  //     message.error('You can only upload JPG/PNG file!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!');
  //   }
  //   return isJpgOrPng && isLt2M;
  // };

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
      // beforeUpload={beforeUpload}
      onChange={handleChange}
      maxCount={maxCount || 1}
      width={width}
      height={height}
      $mobileheight={mobileHeight}
      $mobilewidth={mobileWidth}
      headers={{
        Authorization: `${token}`,
      }}
    >
      {videoUrl ? (
        <Container>
          <VideoContainer className="video" src={videoUrl} />
          <DeleteIconContainer>
            <DeleteIcon
              size={28}
              color="#8E8E8E"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                onClickDelete(e)
              }
            />
          </DeleteIconContainer>
        </Container>
      ) : (
        uploadButton
      )}
    </UploadContainer>
  );
};
