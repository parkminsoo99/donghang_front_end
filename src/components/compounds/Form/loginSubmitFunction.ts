import { emailError, userError } from './loginFormVerification';
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
    });
    if (!isNil(userData.errorDescription)) {
      customNotification({
        message: userData.errorDescription,
        placement: 'top',
        type: 'error',
      });
    } else {
      //get token logic
      const next = setContentIndex();
      if (typeof next === 'number') nextContent(next);
    }
  };
export const PinCodeOnSubmit: LoginOnSubmit =
  (nextContent, setContentIndex) => data => {
    console.log(data);
    const next = setContentIndex();
    if (typeof next === 'number') nextContent(next);
  };
