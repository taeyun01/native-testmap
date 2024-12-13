import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {colors, mapNavigations} from '@/constants';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import AddPostScreen from '@/screens/map/AddPostScreen';
import {LatLng} from 'react-native-maps';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined; // 전달하는 파라미터가 없으므로 undefined
  [mapNavigations.ADD_POST]: {
    location: LatLng;
  }; // location을 받으므로 location을 타이핑함
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
      <Stack.Screen
        name={mapNavigations.ADD_POST}
        component={AddPostScreen}
        options={{
          headerTitle: '장소 추가',
        }}
      />
    </Stack.Navigator>
  );
};

export default MapStackNavigator;
