import { LogoutOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const IconSizeContainer = styled.div`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  display: flex;
`;

interface AccountProps {
  onClick?: () => void;
}

export const Logout = ({ onClick }: AccountProps) => {
  return (
    <IconSizeContainer>
      <LogoutOutlined
        onClick={onClick}
        style={{ fontSize: 28, color: '#FFAAA4' }}
      />
    </IconSizeContainer>
  );
};
