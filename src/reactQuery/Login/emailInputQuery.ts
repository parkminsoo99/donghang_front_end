import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { emailValidateAddress } from '@/constants/address';

// export const emailInputQuery = ({url}:EmailInputQuery) => {
//     const { isPending, data, isError, error} = useQuery({
//         queryKey:['emailLogin'],
//         queryFn: () =>
//             fetch(url).then((res) => res.json())
//     })
//     if(isPending) return "Loding"
//     if(error) return "An error has occurred:" + error.message
// }
interface EmailValidationError {
  error: any;
}
interface EmailValidationResponse {
  success: boolean;
  message?: string;
  // Add more fields as needed based on your API response
}
export const emailValidateData = async (): Promise<
  AxiosResponse<EmailValidationResponse>
> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${emailValidateAddress}`;
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    const data = {
      mail: 'zzangorc99@naver.com',
    };
    return await axios.post(url, data, { headers });
  } catch (e: any) {
    throw new Error('Email Fetch Error: ' + e.message);
  }
};

export const useEmailInputQuery = () => {
  return useMutation({
    mutationKey: ['emailInputQuery'],
    mutationFn: emailValidateData,
    onSuccess: data => {
      console.log('Success:', data);
    },
    onError: error => {
      console.error('Error:', error);
    },
  });
};
