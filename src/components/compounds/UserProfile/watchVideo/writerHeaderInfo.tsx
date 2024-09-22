import { Modify } from '@/components/atomics/Icon/modify';
import { Font } from '@/components/atomics/Font';
import styled from 'styled-components';
import { CustomAvatar } from '@/components/atomics/Avatar';
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
const AvatarWithFont = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 15px;
  height: 76px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #efefef;
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
  flex-wrap: wrap;
  width: calc(100% - 8%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const WriterHeaderInfo = () => {
  const testImage = <img src="/images/salad.png" />;
  const testLabel = 'Cheese._.carrot';
  const testDay = '3';
  const testDescription =
    '이번 여름에 마제소바 먹으러 연신내를 왔습니42342342342342342342424234234234234234다!>.<';
  return (
    <AvatarWithFont>
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
          <Modify />
        </UserProfileWithIconContainer>
        <DescriptionContainer>
          <Font font={12} label={testDescription} />
        </DescriptionContainer>
      </UserProfileWithDescriptionContainer>
    </AvatarWithFont>
  );
};
