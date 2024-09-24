import {
  Modify,
  Chat,
  Heart,
  Dot,
  Report,
  FilledHeart,
} from '@/components/atomics/Icon';
import { Font } from '@/components/atomics/Font';
import styled from 'styled-components';
import { CustomAvatar } from '@/components/atomics/Avatar';
import React, { useState } from 'react';
import { CustomMenu } from '@/components/atomics/Menu';
import { DeleteIcon } from '@/components/atomics/Icon/delete';
import { useMenuStore } from '@/zustand/MenuStore/MenuStore';
import { get } from 'lodash';
import { useHeartStore } from '@/zustand/ChattingStore/HeartIconStore';

const UserProfileWithIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const FontContainer = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const AvatarWithFont = styled.div<{
  $showOtherCommentCount: boolean;
  $isbottomline: boolean;
  $ispaddingleft: boolean;
}>`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 15px 15px 15px ${props => (props.$ispaddingleft ? 50 : 15)}px;
  height: ${props => (props.$showOtherCommentCount ? 90 : 76)}px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: ${props =>
    props.$isbottomline ? '1px solid #efefef' : 'none'};
`;
const AvatarContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  height: 100%;
`;
const UserProfileWithDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 8%);
  height: 100%;
`;

const DescriptionContainer = styled.div`
  width: calc(100% - 8%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: row;
`;

const MenuContainer = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100px;
  gap: 15px;
  text-decoration: none;
  align-items: center;
  color: black;
`;
const userDotArray = [
  <MenuContainer key="ModifyComment">
    <Modify />
    <Font font={16} label="댓글 수정" />
  </MenuContainer>,
  <MenuContainer key="DeleteComment">
    <DeleteIcon color="#000" />
    <Font font={16} label="댓글 삭제" />
  </MenuContainer>,
];
const otherDotArray = [
  <MenuContainer key="ModifyComment">
    <Report />
    <Font font={16} label="신고" />
  </MenuContainer>,
];

export const UserChattingTemplate = () => {
  const testImage = <img src="/images/salad.png" />;
  const testLabel = 'JangYoungJae';
  const testDay = '4';
  const testDescription =
    '이번 여름에 마제소바 먹으러 연신내를 왔습니42342342342342342342424234234234234234다!>.<';
  const like = 312;
  const { setAnchorEl } = useMenuStore();
  const menuKey = 'chatting-menu';
  return (
    <AvatarWithFont
      $showOtherCommentCount={false}
      $isbottomline={true}
      $ispaddingleft={false}
    >
      <AvatarContainer>
        <CustomAvatar userImage={testImage} />
      </AvatarContainer>
      <UserProfileWithDescriptionContainer>
        <UserProfileWithIconContainer>
          <FontContainer>
            <Font label={testLabel} font={14} thick="bold" mobilefont={11} />
            <Font
              label={`${testDay}일 전`}
              font={12}
              thick="bold"
              mobilefont={11}
              color="#8E8E8E"
            />
          </FontContainer>
          <Dot
            size={24}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              setAnchorEl(menuKey, e)
            }
          />
        </UserProfileWithIconContainer>
        <DescriptionContainer>
          <Font font={12} label={testDescription} />
        </DescriptionContainer>
      </UserProfileWithDescriptionContainer>
    </AvatarWithFont>
  );
};

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;
const testImage = <img src="/images/salad.png" />;
const testLabel = 'JangYoungJae';
const testDay = '4';
const testDescription =
  '이번 여름에 마제소바 먹으러fasdfadsfadsfsadfasdfasdfasdfasdf';

interface IsLikeProps {
  like: number;
}
const IsLike = ({ like }: IsLikeProps) => {
  if (like != 0) {
    return <Font label={`${like} 좋아요`} font={12} color="#FFAAA4" />;
  } else {
    return null;
  }
};
interface OtherChattingTemplateProps {
  isPaddingLeft: boolean;
  numberOfOtherCommentCount: number;
  OtherCommentFunction?: () => void;
  showOtherCommentCount: boolean;
  userName: string;
}
export const OtherChattingTemplate = ({
  isPaddingLeft,
  showOtherCommentCount,
  numberOfOtherCommentCount,
  OtherCommentFunction,
  userName,
}: OtherChattingTemplateProps) => {
  const [isOtherComment, setIsOtherComment] = useState(false);
  const { isActiveHeart, setIsActiveHeart } = useHeartStore();
  const { setAnchorEl } = useMenuStore();
  const menuKey = 'chatting-menu';
  const PostedArray = [];

  const IsOtherComment = () => {
    console.log(1);
    PostedArray.push(['test', 2]);
  };

  const onClickHeart = () => {
    setIsActiveHeart(userName, !isActiveHeart[userName]);
  };

  const onHeartReturn = () => {
    if (userName) {
      return isActiveHeart[userName] ? (
        <FilledHeart color="#FFAAA4" size={24} onClick={onClickHeart} />
      ) : (
        <Heart color="#000" size={24} onClick={onClickHeart} />
      );
    } else {
      return <Heart color="#000" size={24} onClick={onClickHeart} />;
    }
  };

  const like: number = 32;
  const commentID = 'Cheese';

  return (
    <AvatarWithFont
      $showOtherCommentCount={showOtherCommentCount}
      $isbottomline={false}
      $ispaddingleft={isPaddingLeft}
    >
      <AvatarContainer>
        <CustomAvatar userImage={testImage} />
      </AvatarContainer>
      <UserProfileWithDescriptionContainer>
        <UserProfileWithIconContainer>
          <FontContainer>
            <Font
              key={userName}
              className="user-name"
              label={userName}
              font={14}
              thick="bold"
              mobilefont={11}
            />
            <Font
              label={`${testDay}일 전`}
              font={12}
              thick="bold"
              mobilefont={11}
              color="#8E8E8E"
            />
            {IsLike({ like })}
          </FontContainer>
          <IconContainer>
            {onHeartReturn()}
            <Chat color="#000" size={24} />|
            <Dot
              size={24}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                setAnchorEl(menuKey, e)
              }
            />
            <CustomMenu titleArray={userDotArray} menuKey={menuKey} />
          </IconContainer>
        </UserProfileWithIconContainer>
        <DescriptionContainer>
          {commentID && <Font font={12} label={`@${commentID}`} color="blue" />}
          <Font font={12} label={testDescription} />
        </DescriptionContainer>
        {showOtherCommentCount && (
          <Font
            buttonMode={true}
            label={`답글 ${numberOfOtherCommentCount}개 더 보기`}
            font={12}
            color="#8E8E8E"
            onClick={OtherCommentFunction}
          />
        )}
      </UserProfileWithDescriptionContainer>
    </AvatarWithFont>
  );
};
