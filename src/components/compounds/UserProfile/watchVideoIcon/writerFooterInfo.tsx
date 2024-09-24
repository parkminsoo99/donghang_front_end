import styled from 'styled-components';
import { Save, Heart } from '@/components/atomics/Icon';
import { CustomAvatar } from '@/components/atomics/Avatar';
import { Font } from '@/components/atomics/Font';
import { CustomInput } from '@/components/atomics/Input';
import { AddEmotion } from '@/components/atomics/Icon/addEmotion';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import EmojiPicker from 'emoji-picker-react';
const EmojiPickerContainer = styled(EmojiPicker)`
  position: absolute;
  top: 0;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #efefef;
  position: relative;
`;
const UpperContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;
const AvatarWithFontContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;
const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
  align-items: center;
`;
const LowerContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #efefef;
  justify-content: center;
  gap: 5px;
`;

const FormContainer = styled.form`
  flex-grow: 1;
`;

export const WriterFooterInfo = () => {
  const [isEmojiActive, setIsEmojiActive] = useState(false);
  const userImage = <img src="/images/mainImage" />;
  const firstUser = 'Kim';
  const numberofUser = 2;
  const postButtonRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onClickSmileIcon = () => {
    setIsEmojiActive(!isEmojiActive);
  };
  const onInputChange = e => {
    if (e.target.value) {
      postButtonRef.current.style.setProperty(
        'color',
        'rgba(255, 180, 190, 1)',
        'important'
      );
    } else {
      postButtonRef.current.style.setProperty(
        'color',
        'rgba(255, 170, 164, 0.3)',
        'important'
      );
    }
  };
  const onClickEmoji = e => {
    console.log(e.emoji);
    inputRef.current.value += e.emoji;
    postButtonRef.current.style.setProperty(
      'color',
      'rgba(255, 180, 190, 1)',
      'important'
    );
  };
  const onSubmit = () => {
    console.log(inputRef.current.value);
  };
  return (
    <Container>
      <UpperContainer>
        <AvatarWithFontContainer>
          <CustomAvatar userImage={userImage} />
          <Font
            font={12}
            color="#262626"
            label={`${firstUser}외 ${numberofUser}명이 해당 영상을 좋아합니다.`}
          />
        </AvatarWithFontContainer>
        <IconContainer>
          <Heart color="#000" size={32} />
          <Save color="#000" size={30} />
        </IconContainer>
      </UpperContainer>
      <LowerContainer>
        <AddEmotion onClick={onClickSmileIcon} />
        <FormContainer>
          <CustomInput
            ref={inputRef}
            font={15}
            onChange={e => onInputChange(e)}
            isOutline={false}
            bordercolor="#fff"
            width={200}
            height={18}
            borderRadius={0}
            placeholder="댓글 추가"
          />
        </FormContainer>
        <Font
          className="postButton"
          onClick={onSubmit}
          ref={postButtonRef}
          font={13}
          label="게시"
          color="rgba(255, 170, 164, 0.5)"
          buttonMode={true}
        />
      </LowerContainer>
      {isEmojiActive && (
        <EmojiPickerContainer onEmojiClick={e => onClickEmoji(e)} />
      )}
    </Container>
  );
};
