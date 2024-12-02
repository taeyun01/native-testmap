import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {colors, mapNavigations} from '@/constants';
import MapHomeScreen from '@/screens/map/MapHomeScreen';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

const MapStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.WHITE, // 배경색 흰색으로 설정 (Stack.Screen 각각에 적용할 수도 있음)
        },
        headerStyle: {
          backgroundColor: colors.WHITE, // 헤더 배경 설정
          shadowColor: 'gray', // 헤더 그림자
        },
        headerTitleStyle: {
          fontSize: 15, // 헤더 타이틀 크기
        },
        headerTintColor: colors.PINK_700, // 헤더 타이틀 색상
      }}>
      <Stack.Screen
        name={mapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{
          headerTitle: '',
          headerShown: false, // 헤더 숨김
        }}
      />
    </Stack.Navigator>
  );
};

export default MapStackNavigator;
