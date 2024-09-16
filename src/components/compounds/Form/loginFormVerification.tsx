import isNil from 'lodash/isNil';

interface ErrorProps {
  errorDescription?: string;
}

type argProps = string | undefined;

export function emailError(email: argProps): ErrorProps {
  const emailError: ErrorProps = {};

  if (isNil(email) || email.length == 0) {
    emailError.errorDescription = '이메일을 입력해주세요.';
  } else if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
    emailError.errorDescription = '이메일 형식이 아닙니다.';
  }
  return emailError;
}

interface userDetailProps {
  name?: argProps;
  userNickName?: argProps;
  password?: argProps;
}
export function userError({
  name,
  userNickName,
  password,
}: userDetailProps): ErrorProps {
  const userError: ErrorProps = {};
  if (isNil(name) || name.length === 0) {
    userError.errorDescription = '이름을 입력해주세요.';
  } else if (isNil(userNickName) || userNickName.length === 0) {
    userError.errorDescription = '닉네임을 입력해주세요.';
  } else if (name.length > 4) {
    userError.errorDescription = '너무 긴 이름입니다.';
  } else if (userNickName.length > 24) {
    userError.errorDescription = '너무 긴 닉네임입니다.';
  }
  return userError;
}
