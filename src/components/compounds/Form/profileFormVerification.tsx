import isNil from 'lodash/isNil';

interface ErrorProps {
  errorDescription?: string;
}

type argProps = string | undefined;

export function nameError(name: argProps): ErrorProps {
  const nameError: ErrorProps = {};

  if (isNil(name) || name.length == 0) {
    nameError.errorDescription = '이름을 입력해주세요.';
  } else if (!/^[가-힣a-zA-Z\s]+$/.test(name)) {
    nameError.errorDescription = '올바르지 않은 이름 형식입니다.';
  }
  return nameError;
}

export function nickNameError(userNickName: argProps): ErrorProps {
  const nicknameError: ErrorProps = {};
  if (isNil(userNickName) || userNickName.length === 0) {
    nicknameError.errorDescription = '닉네임을 입력해주세요.';
  } else if (userNickName.length > 24) {
    nicknameError.errorDescription = '너무 긴 닉네임입니다.';
  } else if (!/^[가-힣a-zA-Z0-9_]+$/.test(userNickName)) {
    nicknameError.errorDescription = '올바르지 않은 이메일 형식입니다.';
  }
  return nicknameError;
}

export function webSiteError(webSite: argProps): ErrorProps {
  const webSiteError: ErrorProps = {};

  if (
    !isNil(webSite) &&
    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\/\w-._~:?#[\]@!$&'()*+,;=]*)?$/.test(
      webSite
    )
  ) {
    webSiteError.errorDescription = '올바르지 않은 웹사이트입니다.';
  }
  return webSiteError;
}

export function introductionError(introduction: argProps): ErrorProps {
  const introductionError: ErrorProps = {};

  if (!isNil(introduction) && introduction.length > 200) {
    introductionError.errorDescription = '너무 긴 설명입니다.';
  } else if (!isNil(introduction) && !/^[\s\S]$/.test(introduction)) {
    introductionError.errorDescription = '올바르지 않은 설명입닏.';
  }
  return introductionError;
}
