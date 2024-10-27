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
type PinCodeOnSubmitType = (
  nextContent: MyFunctionType,
  setContentIndex: SetContentIndexType,
  isValid: boolean
) => SubmitHandler<LoginFormProps>;

export const loginOnSubmit: LoginOnSubmit =
  (nextContent, setContentIndex) => data => {
    console.log(data);
    const emailData = emailError(data.email);
    console.log(emailData);
    if (!isNil(emailData.errorDescription)) {
      customNotification({
        message: emailData.errorDescription,
        placement: 'top',
        type: 'error',
      });
      return false;
    } else {
      const next = setContentIndex();
      if (typeof next === 'number') nextContent(next);
      return true;
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
      return false;
    } else {
      const next = setContentIndex();
      if (typeof next === 'number') nextContent(next);
      return true;
    }
  };
export const PinCodeOnSubmit: PinCodeOnSubmitType =
  (nextContent, setContentIndex, isValid) => data => {
    if (isValid) {
      const next = setContentIndex();
      if (typeof next === 'number') nextContent(next);
    } else {
      customNotification({
        message: '인증번호가 맞지 않습니다.',
        placement: 'top',
        type: 'error',
      });
    }
  };

export const LoginSuccessNotification = () => {
  customNotification({
    message: '로그인 성공했습니다.',
    placement: 'top',
    type: 'success',
    duration: 2,
  });
};
export const LoginFailNotification = () => {
  customNotification({
    message: '로그인 실패했습니다.',
    placement: 'top',
    type: 'error',
    duration: 2,
  });
};

export const RegisterSuccessNotification = () => {
  customNotification({
    message: '회원가입에 성공했습니다.',
    placement: 'top',
    type: 'success',
    duration: 2,
  });
};
export const RegisterFailNotification = () => {
  customNotification({
    message: '회원가입에 실패했습니다.',
    placement: 'top',
    type: 'error',
    duration: 2,
  });
};
export const PincodeFailNotification = () => {
  customNotification({
    message: '인증번호가 맞지 않습니다.',
    placement: 'top',
    type: 'error',
    duration: 2,
  });
};
export const LogOutNotification = () => {
  customNotification({
    message: '로그아웃 되었습니다.',
    placement: 'top',
    type: 'success',
    duration: 2,
  });
};

export const NeedToLogInNotification = () => {
  customNotification({
    message: '로그인을 먼저 해주세요.',
    placement: 'top',
    type: 'error',
    duration: 2,
  });
};
