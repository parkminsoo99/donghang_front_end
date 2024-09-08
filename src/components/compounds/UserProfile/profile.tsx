import styled from 'styled-components';
import { ProfileForm } from '../Form/profileForm';
const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
`;

export const Profile = () => {
  return (
    <FormContainer>
      <ProfileForm
        key="profilForm"
        registerArray={[
          'profileName',
          'profileNickName',
          'profileWebSite',
          'profileIntroduction',
        ]}
        idArray={[
          'profileName',
          'profileNickName',
          'profileWebSite',
          'profileIntroduction',
        ]}
        placeholderArray={['이름', '닉네임', '웹사이트', '소개']}
        typeArray={['name', 'text', 'text', 'text', 'text']}
        sideFont={[
          '',
          '다른 사람이 닉네임을 통해 당신을 찾을 수 있습니다.',
          '자신이 가지고 있는 웹사이트를 통해 다른 사람에게 홍보를 해보세요.',
          '한 줄 소개를 통해 본인이 어떤 사람인지 간단히 소개할 수 있습니다.',
        ]}
      />
    </FormContainer>
  );
};
