import isNil from 'lodash/isNil';

interface ErrorProps {
  errorDescription?: string;
}

export function emailError(userInput: string | undefined): ErrorProps {
  const emailError: ErrorProps = {};

  if (isNil(userInput) || userInput.length == 0) {
    emailError.errorDescription = '이메일을 입력해주세요.';
  } else if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(userInput)) {
    emailError.errorDescription = '이메일 형식이 아닙니다.';
  }
  return emailError;
}
