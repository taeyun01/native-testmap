import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils';

const LoginScreen = () => {
  const login = useForm({
    initialState: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    console.log('submit', login.loginForm);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error={login.errors.email}
          inputMode="email" // 키보드에 골뱅이가 생김
          touched={login.touched.email}
          // value={loginForm.email}
          // onChangeText={text => handleChangeLoginForm('email', text)}
          // onBlur={() => handleBlur('email')} // 터치 끝날 때 호출
          {...login.getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={login.errors.password}
          secureTextEntry // 패스워드 마스킹 처리
          touched={login.touched.password}
          // value={loginForm.password}
          // onChangeText={text => handleChangeLoginForm('password', text)}
          // onBlur={() => handleBlur('password')}
          {...login.getTextInputProps('password')}
        />
        <CustomButton
          label="로그인"
          variant="filled"
          size="large"
          onPress={handleSubmit}
        />
      </View>
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
  },
});

export default LoginScreen;
