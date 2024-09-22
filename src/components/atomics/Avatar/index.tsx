import { Avatar } from 'antd';

interface AvatarProps {
  userImage: JSX.Element;
}
export const CustomAvatar = ({ userImage }: AvatarProps) => {
  return <Avatar size={30}>{userImage}</Avatar>;
};
