import {View, SafeAreaView} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import {authNavigations} from '../../constants/navigations';
import CustomButton from '../../components/CustomButton';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const AuthHomeScreen = ({navigation}: AuthHomeScreenProps) => {
  return (
    <SafeAreaView>
      <View>
        <CustomButton
          label="로그인 하기"
          variant="filled"
          size="large"
          onPress={() => navigation.navigate(authNavigations.LOGIN)} // 이동할 스크린 name
        />
        <CustomButton
          label="회원가입 하기"
          variant="outlined"
          onPress={() => navigation.navigate(authNavigations.SIGNUP)} // 이동할 스크린 name
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthHomeScreen;
