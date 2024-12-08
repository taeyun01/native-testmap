import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import CalendarHomeScreen from '@/screens/calendar/CalendarHomeScreen';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MapStackNavigator, {
  MapStackParamList,
} from '@/navigations/stack/MapStackNavigator';
import {colors, mainNavigations} from '@/constants';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import CustomDrawerContent from '@/navigations/drawer/CustomDrawerContent';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: undefined;
  [mainNavigations.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

// 네비게이션에 따라 아이콘 부여
const DrawerIcons = (
  route: RouteProp<MainDrawerParamList>,
  focused: boolean,
) => {
  let iconName = '';
  switch (route.name) {
    case mainNavigations.HOME: {
      iconName = 'location-on';
      break;
    }
    case mainNavigations.FEED: {
      iconName = 'book';
      break;
    }
    case mainNavigations.CALENDAR: {
      iconName = 'event-note';
      break;
    }
  }
  return (
    <MaterialIcons
      name={iconName}
      size={18}
      color={focused ? colors.PINK_700 : colors.GRAY_500}
    />
  );
};

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({route}) => ({
        headerShown: false, // 헤더 숨김
        drawerType: 'front', // 드로워가 열릴 때 메뉴바가 밀리지 않고 위로 덮어져서 열리게 설정
        drawerIcon: ({focused}) => DrawerIcons(route, focused),
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.6,
          backgroundColor: colors.WHITE,
        },
        drawerActiveTintColor: colors.PINK_700, // 현재 포커스된 텍스트 색상 및 배경 색상
        // drawerActiveBackgroundColor: colors.PINK_200, // 현재 포커스된 배경 색상 (위 TintColor만 변경해도 박스도 적용됨)
        // drawerInactiveBackgroundColor: colors.GRAY_100, // 현재 포커스되지 않은 배경 색상
        drawerLabelStyle: {
          fontWeight: '600',
        },
      })}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
          swipeEnabled: false, // 왼쪽에서 오른쪽으로 스와이프 할 때 서랍이 열릴 수 있음. 지도 화면에서는 스와이프하면서 서랍이 열릴 수 있기때문에 비활성화
        }}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedHomeScreen}
        options={{
          title: '피드',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={{
          title: '캘린더',
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
