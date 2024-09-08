// import { nameError, nickNameError, webSiteError, introductionError} from './profileFormVerification';
// import { SubmitHandler } from 'react-hook-form';
// import customNotification from '@/components/atomics/Notification';
// import isNil from 'lodash/isNil';
// import { FormProps } from '@/types/formProps';

// type SetContentIndexType = () => void;
// type MyFunctionType = (index: number) => void;
// type profileOnSubmit = (
//   nextContent: MyFunctionType,
//   setContentIndex: SetContentIndexType
// ) => SubmitHandler<FormProps>;

// export const nameOnSubmit: profileOnSubmit =
//   (nextContent, setContentIndex) => data => {
//     console.log(data);
//     const emailData = nameError(data.);
//     console.log(emailData);
//     if (!isNil(emailData.errorDescription)) {
//       customNotification({
//         message: emailData.errorDescription,
//         placement: 'top',
//         type: 'error',
//       });
//     } else {
//       const next = setContentIndex();
//       if (typeof next === 'number') nextContent(next);
//     }
//   };

// export const nicknameOnSubmit: profileOnSubmit =
//   (nextContent, setContentIndex) => data => {
//     console.log(data);
//     const userData = nickNameError({
//       name: data.name,
//       userNickName: data.nickname,
//       password: data.registerPassword,
//     });
//     if (!isNil(userData.errorDescription)) {
//       customNotification({
//         message: userData.errorDescription,
//         placement: 'top',
//         type: 'error',
//       });
//     } else {
//       const next = setContentIndex();
//       if (typeof next === 'number') nextContent(next);
//     }
//   };

// export const websiteOnSubmit: profileOnSubmit =
//   (nextContent, setContentIndex) => data => {
//     console.log(data);
//     const passwordData = webSiteError(data.loginPassword);
//     if (!isNil(passwordData.errorDescription)) {
//       customNotification({
//         message: passwordData.errorDescription,
//         placement: 'top',
//         type: 'error',
//       });
//     } else {
//       const next = setContentIndex();
//       if (typeof next === 'number') nextContent(next);
//     }
//   };

// export const introductionOnSubmit: profileOnSubmit =
//   (nextContent, setContentIndex) => data => {
//     console.log(data);
//     const passwordData = introductionError(data.loginPassword);
//     if (!isNil(passwordData.errorDescription)) {
//       customNotification({
//         message: passwordData.errorDescription,
//         placement: 'top',
//         type: 'error',
//       });
//     } else {
//       const next = setContentIndex();
//       if (typeof next === 'number') nextContent(next);
//     }
//   };
