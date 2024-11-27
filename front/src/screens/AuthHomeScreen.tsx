import {View, Text, Button, SafeAreaView} from 'react-native';
import React from 'react';

const AuthHomeScreen = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인 화면으로 이동"
          onPress={() => navigation.navigate('Login')} // 이동할 스크린 name
        />
        <Text>인증 홈 화면</Text>
      </View>
    </SafeAreaView>
  );
};

export default AuthHomeScreen;
