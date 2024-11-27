type UserInfomation = {
  email: string;
  password: string;
};

const validateLogin = (values: UserInfomation) => {
  const errors = {
    email: '',
    password: '',
  };

  // aaa@aaa.aaa 이런 형식이 아니면 에러표시
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '이메일 형식이 올바르지 않습니다.';
  }

  // 비밀번호 8자 이상 20자 이하가 아니면 에러표시
  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }

  return errors;
};

export {validateLogin};
