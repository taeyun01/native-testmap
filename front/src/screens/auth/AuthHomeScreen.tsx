import {View, Button, SafeAreaView} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import {authNavigations} from '../../constants';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const AuthHomeScreen = ({navigation}: AuthHomeScreenProps) => {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인 화면으로 이동"
          onPress={() => navigation.navigate(authNavigations.LOGIN)} // 이동할 스크린 name
        />
        <Button
          title="회원가입 화면으로 이동"
          onPress={() => navigation.navigate(authNavigations.SIGNUP)} // 이동할 스크린 name
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthHomeScreen;
