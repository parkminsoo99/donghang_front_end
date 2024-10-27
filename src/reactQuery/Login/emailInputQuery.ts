import { dataTagSymbol, useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import {
  emailValidateAddress,
  emailValidateCodeAddress,
  userRegister,
} from '@/constants/address';
import { PincodeFailNotification } from '@/components/compounds/Form/loginSubmitFunction';
interface EmailValidationError {
  error: any;
}
interface EmailValidationResponse {
  success: boolean;
  message?: string;
}
interface emailValidateDataProps {
  userEmail: string;
}
export const fetchEmailValidate = async ({
  userEmail,
}: emailValidateDataProps): Promise<AxiosResponse<EmailValidationResponse>> => {
  try {
    console.log('userEmail', userEmail);
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${emailValidateAddress}`;
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    const data = {
      mail: userEmail,
    };
    return await axios.post(url, data, { headers });
  } catch (e: any) {
    throw new Error('Email Fetch Error: ' + e.message);
  }
};

interface FetchPinCodeValidateProps {
  userEmail: string;
  pinCode: string;
}

export const fetchPinCodeValidate = async ({
  userEmail,
  pinCode,
}: FetchPinCodeValidateProps): Promise<
  AxiosResponse<EmailValidationResponse>
> => {
  try {
    console.log('userEmail', userEmail, pinCode);
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${emailValidateCodeAddress}?email=${userEmail}&userNumber=${pinCode}`;
    const data = await axios.get(url);
    console.log('mailchechdata', data);
    return data;
  } catch (e: any) {
    if (e.response && e.response.status == 401) {
      PincodeFailNotification();
    } else if (e.response && e.response.status == 303) {
      return e.response;
    } else {
      throw new Error('Email Fetch Error: ' + e.message);
    }
  }
};
interface fetchUserValidateProps {
  name: string;
  nickName: string;
  email: string;
}
export const fetchUserRegister = async ({
  email,
  name,
  nickName,
}: fetchUserValidateProps): Promise<AxiosResponse<EmailValidationResponse>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${userRegister}`;
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    const data = {
      email: email,
      username: name,
      nickname: nickName,
    };
    return await axios.post(url, data, { headers });
  } catch (e: any) {
    throw new Error('Email Fetch Error: ' + e.message);
  }
};
