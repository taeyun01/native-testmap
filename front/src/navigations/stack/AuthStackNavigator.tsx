import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthHomeScreen from '../../screens/auth/AuthHomeScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import {authNavigations, colors} from '../../constants';
import SignupScreen from '../../screens/auth/SignupScreen';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
  [authNavigations.SIGNUP]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white', // 배경색 흰색으로 설정 (Stack.Screen 각각에 적용할 수도 있음)
        },
        headerStyle: {
          backgroundColor: 'white', // 헤더 배경 설정
          shadowColor: 'gray', // 헤더 그림자
        },
        headerTitleStyle: {
          fontSize: 15, // 헤더 타이틀 크기
        },
        headerTintColor: colors.PINK_700, // 헤더 타이틀 색상
      }}>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerTitle: '',
          headerShown: false, // 헤더 숨김
        }}
      />
      <Stack.Screen
        name={authNavigations.LOGIN}
        component={LoginScreen}
        options={{headerTitle: '로그인'}}
      />
      <Stack.Screen
        name={authNavigations.SIGNUP}
        component={SignupScreen}
        options={{headerTitle: '회원가입'}}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
