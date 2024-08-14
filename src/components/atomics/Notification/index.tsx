import { createElement } from 'react';
import { notification, NotificationArgsProps } from 'antd';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

type NotificationPlacement = NotificationArgsProps['placement'];

interface OpenNotificationProps {
  placement: NotificationPlacement;
  icon?: ForwardRefExoticComponent<
    AntdIconProps & RefAttributes<HTMLSpanElement>
  >;
  description?: string;
  color?: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export default function CustomNotification({
  message,
  placement,
  icon,
  description,
  color,
  type,
}: OpenNotificationProps) {
  notification[type]({
    message: message,
    description: description ? description : null,
    placement,
    icon: icon ? createElement(icon, { style: { color } }) : null,
    duration: 1,
  });
}
