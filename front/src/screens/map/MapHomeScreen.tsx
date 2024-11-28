import {View, Text, Button} from 'react-native';
import React from 'react';
import useAuth from '../../hooks/queries/useAuth';

const MapHomeScreen = () => {
  const {logoutMutation} = useAuth();

  return (
    <View>
      <Text>맵 스크린!!</Text>
      <Button
        title="로그아웃 테스트"
        onPress={() => logoutMutation.mutate(null)}
      />
    </View>
  );
};

export default MapHomeScreen;
