import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import styled from 'styled-components';
import './profile.css';
import { DeleteIcon } from '@/components/atomics/Icon/delete';
import { Share } from '@/components/atomics/Icon';
import { WatchIcon } from '@/components/atomics/Icon';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const ImageContainer = styled.div`
  overflow: hidden !important;
  width: 100%;
  height: 100%;
  position: relative; /* Add this line */
  &:hover .delete-icon {
    opacity: 1;
  }
  &:hover {
    opacity: 0.5;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  top: 45%;
  left: 25%;
  opacity: 0;
  gap: 4px;
  background-color: none;
  border-color: none;
  z-index: 500;
`;

const Container = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
`;
const SubContainer = styled.div`
  padding: 14px 0;
`;

const ImgStyle = styled.img`
  width: 100% !important;
  height: 100% !important;
  transition: opacity 0.3s;
`;

const IconSet = () => {
  return (
    <>
      <Share size={24} />
      <WatchIcon size={27} />
      <DeleteIcon size={26} />
    </>
  );
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

export const MyVideo = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  return (
    <Container className="Container">
      <SubContainer>
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          className="UploadContainer"
          itemRender={(originNode, file) => (
            <ImageContainer className="ImgContainer">
              {file.url ? (
                <>
                  <ImgStyle src={file.url} alt={file.name} />
                  <IconContainer className="delete-icon">
                    <IconSet />
                  </IconContainer>
                </>
              ) : (
                originNode
              )}
            </ImageContainer>
          )}
        >
          {/* {fileList.length >= 8 ? null : uploadButton} */}
        </Upload>
        {/* {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: visible => setPreviewOpen(visible),
              afterOpenChange: visible => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )} */}
      </SubContainer>
    </Container>
  );
};

export const SavedVideo = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  return (
    <Container className="Container">
      <SubContainer>
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          className="UploadContainer"
          itemRender={(originNode, file) => (
            <ImageContainer className="ImgContainer">
              {file.url ? (
                <>
                  <ImgStyle src={file.url} alt={file.name} />
                  <IconContainer className="delete-icon">
                    <IconSet />
                  </IconContainer>
                </>
              ) : (
                originNode
              )}
            </ImageContainer>
          )}
        >
          {/* {fileList.length >= 8 ? null : uploadButton} */}
        </Upload>
        {/* {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: visible => setPreviewOpen(visible),
              afterOpenChange: visible => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )} */}
      </SubContainer>
    </Container>
  );
};
