import {View, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import React, {useRef} from 'react';
import InputField from '../../components/InputField';
import useForm from '../../hooks/useForm';
import CustomButton from '../../components/CustomButton';
import {validateSignup} from '../../utils';
import useAuth from '../../hooks/queries/useAuth';

const SignupScreen = () => {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const {signupMutation, loginMutation} = useAuth();

  const signup = useForm({
    initialState: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validateSignup,
  });

  const handleSubmit = () => {
    // console.log(signup.loginForm);
    //* signup.loginForm은 passwordConfirm까지 포함돼있어 로그인을 위해 따로 빼줌
    const {email, password} = signup.loginForm;

    //* 회원가입 후 로그인도 자동으로 진행될 수 있게 처리
    signupMutation.mutate(
      {email, password},
      {
        onSuccess: () => loginMutation.mutate({email, password}),
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={signup.errors.email}
          inputMode="email" // 키보드에 골뱅이가 생김
          touched={signup.touched.email}
          returnKeyType="next" // 엔터키 누르면 다음 인풋으로 넘어감
          blurOnSubmit={false} // 엔터키 누른 후 키보드가 내려가지 않음
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...signup.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode" // 패스워드 입력시 아이폰의 기본적인 스트롱 패스워드가 뜰 수가 있음 그걸 방지하기 위함
          error={signup.errors.password}
          secureTextEntry // 패스워드 마스킹 처리
          touched={signup.touched.password}
          returnKeyType="next"
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          textContentType="oneTimeCode"
          error={signup.errors.passwordConfirm}
          secureTextEntry // 패스워드 마스킹 처리
          touched={signup.touched.passwordConfirm}
          onSubmitEditing={handleSubmit}
          {...signup.getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" variant="filled" size="large" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default SignupScreen;
