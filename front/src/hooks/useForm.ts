import {useEffect, useState} from 'react';

interface UseFormProps<T> {
  initialState: T;
  validate: (values: T) => Record<keyof T, string>; // values받아 에러 상태의 객체를 리턴. keyof는 T이고 값은 에러메세지인 string
}

const useForm = <T>({initialState, validate}: UseFormProps<T>) => {
  const [loginForm, setLoginForm] = useState(initialState);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChangeLoginForm = (name: keyof T, text: string) => {
    setLoginForm({
      ...loginForm,
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getTextInputProps = (name: keyof T) => {
    const value = loginForm[name];
    const onChangeText = (text: string) => handleChangeLoginForm(name, text);
    const onBlur = () => handleBlur(name);

    return {value, onChangeText, onBlur};
  };

  useEffect(() => {
    const newErrors = validate(loginForm);
    setErrors(newErrors);
  }, [validate, loginForm]);

  return {loginForm, errors, touched, getTextInputProps};
};

export default useForm;
