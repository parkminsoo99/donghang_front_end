// import { useQuery} from "@tanstack/react-query"
// import axios, { AxiosResponse } from 'axios';
// import { emailValidateCodeAddress } from "@/constants/address";

// // export const emailInputQuery = ({url}:EmailInputQuery) => {
// //     const { isPending, data, isError, error} = useQuery({
// //         queryKey:['emailLogin'],
// //         queryFn: () =>
// //             fetch(url).then((res) => res.json())
// //     })
// //     if(isPending) return "Loding"
// //     if(error) return "An error has occurred:" + error.message
// // }

// interface emailValidateDataProps{
//   verificationCode?:number
// }

// export const emailValidateData = async ({verificationCode}:emailValidateDataProps): Promise<AxiosRequ<any>> => {
//     try {
//       const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${emailValidateCodeAddress}`;

//       const data = {
//         userNumber: verificationCode,
//       };
//       return await axios.get(url, {
//         params: data,
//       });
//     } catch (e: any) {
//       throw new Error("Email Fetch Error: " + e.message);
//   }
// };

// export const useEmailVerificationCodeQuery = () => {
//   return useQuery({
//     queryKey: ['EmailVerificationCodeQuery'],
//     queryFn : emailValidateData,
//     onSuccess: (data: any) => {
//       console.log("Success:", data);
//     },
//     onError: (error: any) => {
//       console.error("Error:", error);
//     },
//   });
// };
