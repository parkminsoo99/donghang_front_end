import isNil from 'lodash/isNil';

interface ErrorProps {
  errorDescription?: string;
}

type userEmailProps = string | undefined;

export function emailError(email: userEmailProps): ErrorProps {
  const emailError: ErrorProps = {};

  if (isNil(email) || email.length == 0) {
    emailError.errorDescription = '이메일을 입력해주세요.';
  } else if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
    emailError.errorDescription = '이메일 형식이 아닙니다.';
  }
  return emailError;
}
type userDetailPropsType = string | undefined;

interface userDetailProps {
  name?: userDetailPropsType;
  userNickName?: userDetailPropsType;
  password?: userDetailPropsType;
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
  } else if (isNil(password) || password.length === 0) {
    userError.errorDescription = '비밀번호를 입력해주세요.';
  } else if (name.length > 4) {
    userError.errorDescription = '너무 긴 이름입니다.';
  } else if (userNickName.length > 24) {
    userError.errorDescription = '너무 긴 닉네임입니다.';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(
      password
    )
  ) {
    userError.errorDescription =
      '비밀번호는 대문자, 소문자, 숫자, 특수문자 포함 및 최소 10자 이상 입니다.';
  }
  return userError;
}

type passwordEmailProps = string | undefined;

export function passwordError(password: passwordEmailProps): ErrorProps {
  const passwordError: ErrorProps = {};

  if (isNil(password) || password.length == 0) {
    passwordError.errorDescription = '비밀번호를 입력해주세요.';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(
      password
    )
  ) {
    passwordError.errorDescription =
      '비밀번호는 대문자, 소문자, 숫자, 특수문자 포함 및 최소 10자 이상 입니다.';
  }
  return passwordError;
}
