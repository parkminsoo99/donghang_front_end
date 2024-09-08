import { emailError, userError, passwordError } from './loginFormVerification';
import { SubmitHandler } from 'react-hook-form';
import customNotification from '@/components/atomics/Notification';
import isNil from 'lodash/isNil';
import { LoginFormProps } from '@/types/formProps';

type SetContentIndexType = () => void;
type MyFunctionType = (index: number) => void;
type LoginOnSubmit = (
  nextContent: MyFunctionType,
  setContentIndex: SetContentIndexType
) => SubmitHandler<LoginFormProps>;

export const loginOnSubmit: LoginOnSubmit =
  (nextContent, setContentIndex) => data => {
    console.log('??', nextContent, setContentIndex);
    console.log(data);
    const emailData = emailError(data.email);
    console.log(emailData);
    if (!isNil(emailData.errorDescription)) {
      customNotification({
        message: emailData.errorDescription,
        placement: 'top',
        type: 'error',
      });
    } else {
      const next = setContentIndex();
      if (typeof next === 'number') nextContent(next);
    }
  };

export const userOnSubmit: LoginOnSubmit =
  (nextContent, setContentIndex) => data => {
    console.log(data);
    const userData = userError({
      name: data.name,
      userNickName: data.nickname,
      password: data.registerPassword,
    });
    if (!isNil(userData.errorDescription)) {
      customNotification({
        message: userData.errorDescription,
        placement: 'top',
        type: 'error',
      });
    } else {
      const next = setContentIndex();
      if (typeof next === 'number') nextContent(next);
    }
  };

export const passwordOnSubmit: LoginOnSubmit =
  (nextContent, setContentIndex) => data => {
    console.log(data);
    const passwordData = passwordError(data.loginPassword);
    if (!isNil(passwordData.errorDescription)) {
      customNotification({
        message: passwordData.errorDescription,
        placement: 'top',
        type: 'error',
      });
    } else {
      const next = setContentIndex();
      if (typeof next === 'number') nextContent(next);
    }
  };
