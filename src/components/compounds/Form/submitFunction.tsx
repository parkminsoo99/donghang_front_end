import { emailError, userError } from './formVerification';
import { SubmitHandler } from 'react-hook-form';
import customNotification from '@/components/atomics/Notification';
import isNil from 'lodash/isNil';
import { FormProps } from "@/types/formProps";
  
export const loginOnSubmit: SubmitHandler<FormProps> = data => {
    console.log(data);
    const emailData = emailError(data.email);
    console.log(emailData);
    if (!isNil(emailData.errorDescription)) {
      customNotification({
        message: emailData.errorDescription,
        placement: 'top',
        type: 'error',
      });
    }
  };
  
  export const userOnSubmit: SubmitHandler<FormProps> = data => {
    console.log(data);
    const userData = userError({
      name: data.name, 
      userNickName: data.nickname, 
      password:data.registerPassword,
    });
    if (!isNil(userData.errorDescription)) {
      customNotification({
        message: userData.errorDescription,
        placement: 'top',
        type: 'error',
      });
    }
  };
  export const passwordOnSubmit: SubmitHandler<FormProps> = data => {
    console.log(data);
    const passwordData = userError({
      password:data.loginPassword,
    });
    if (!isNil(passwordData.errorDescription)) {
      customNotification({
        message: passwordData.errorDescription,
        placement: 'top',
        type: 'error',
      });
    }
  };