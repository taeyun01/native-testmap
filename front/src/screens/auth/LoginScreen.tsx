import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import InputField from '../../components/InputField';

const LoginScreen = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChangeLoginForm = (name: string, text: string) => {
    setLoginForm({
      ...loginForm,
      [name]: text,
    });
  };

  const handleBlur = (name: string) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error="이메일을 입력하세요."
          inputMode="email" // 키보드에 골뱅이가 생김
          value={loginForm.email}
          onChangeText={text => handleChangeLoginForm('email', text)}
          touched={touched.email}
          onBlur={() => handleBlur('email')} //
        />
        <InputField
          placeholder="비밀번호"
          error="비밀번호를 입력하세요."
          secureTextEntry // 패스워드 마스킹 처리
          value={loginForm.password}
          onChangeText={text => handleChangeLoginForm('password', text)}
          touched={touched.password}
          onBlur={() => handleBlur('password')}
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
