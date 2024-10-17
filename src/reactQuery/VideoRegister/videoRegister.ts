import axios, { AxiosResponse } from 'axios';
interface fetchVideoRegisterProps {
  jsonData: {
    url: string;
    content: string;
    lat: number;
    lng: number;
    category: string;
    restaurant: string;
  };
}
export const fetchVideoRegister = async ({
  jsonData,
}: fetchVideoRegisterProps): Promise<AxiosResponse<any, any>> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/videos`;
    return await axios.post(url, jsonData);
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      throw new Error(
        `fetchVideoRegister Error: ${e.response?.statusText || e.message}`
      );
    } else {
      throw new Error(`fetchVideoRegister Error: ${e.message}`);
    }
  }
};

// import { useQuery } from '@tanstack/react-query';
// import axios, { AxiosResponse } from 'axios';
// import { CustomSpinner } from '@/components/atomics/Spinner/indext';

// export const fetchAddress = async (
//   text: string
// ): Promise<AxiosResponse<any, any>> => {
//   try {
//     console.log('process.env.NEXT_PUBLIC_API_BASE_URL', text);
//     const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search?query=${text}`;
//     return await axios.get(url);
//   } catch (e: any) {
//     throw new Error('FetchAddress Error: ' + e.message);
//   }
// };
// export const useAddressQuery = (inputText: string) => {
//   console.log('inputText??', inputText);
//   const { isLoading, data, isError, isSuccess } = useQuery({
//     queryKey: ['AddressQuery', inputText],
//     queryFn: () => fetchAddress(inputText),
//   });

//   if (isError) {
//     console.log('useAddressQuery Error');
//     return null;
//   }
//   if (isLoading) {
//     return null;
//   }
//   if (isSuccess) {
//     console.log('DATA', data);
//     return data;
//   }

//   return null;
// };
