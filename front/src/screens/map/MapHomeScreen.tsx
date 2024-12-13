import React, {useRef, useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {alerts, colors, mapNavigations} from '@/constants';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import useUserLocation from '@/hooks/useUserLocation';
import usePermission from '@/hooks/usePermission';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import mapStyle from '@/style/mapStyle';
import CustomMarker from '@/components/CustomMarker';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const MapHomeScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const mapRef = useRef<MapView | null>(null);
  const {userLocation, isUserLocationError} = useUserLocation();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();

  usePermission('LOCATION');

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      // 에러표시
      return;
    }

    mapRef.current?.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  };

  //* 장소 추가 페이지 이동
  const handlePressAddPost = () => {
    // 만약 길게 눌러서 위치를 선택하지 않았는데 플러스 버튼을 눌렀다면 경고창 메세지
    if (!selectLocation) {
      return Alert.alert(
        alerts.NOT_SELECTED_LOCATION.TITLE,
        alerts.NOT_SELECTED_LOCATION.DESCRIPTION,
      );
    }

    // 길게 눌러서 선택된 장소가 있다면 장소를 추가하는 화면으로 이동
    // 파람스로 넘기는건 id같은 정보만 넘기길 권장함 (정보들을 넘겨야할 땐 전역 상태 이용하기)
    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation, // 선택한 위치를 파람스로 넘김
    });

    // 장소 추가 페이지에서 뒤로가기를 했을 때는 마커 위치 초기화
    setSelectLocation(null);
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation // 현재 내 위치 표시
        followsUserLocation // 내 위치 표시 후 내 위치 표시 유지
        showsMyLocationButton={false} // 현재 위치로 이동하는 버튼 (직접 구현할거라서 false)
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}>
        {/* 마커표시 [나중에 배열로 여러개 표시] */}
        <CustomMarker
          color="RED"
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
        />
        <CustomMarker
          color="GREEN"
          score={2}
          coordinate={{
            latitude: 37.55160323652,
            longitude: 126.989896260202,
          }}
        />
        {/* onLongPress로 길게 누를 시 selectLocation이 있으면 마커 표시 */}
        {selectLocation && (
          <Callout>
            <Marker coordinate={selectLocation} />
          </Callout>
        )}
      </MapView>
      {/* //* 메뉴 버튼 */}
      <Pressable
        style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={25} color={colors.WHITE} />
      </Pressable>

      <View style={styles.buttonList}>
        {/* //* + 버튼 */}
        <Pressable style={styles.mapButton} onPress={handlePressAddPost}>
          <MaterialIcons name="add" size={25} color={colors.WHITE} />
        </Pressable>
        {/* //* 내 위치 버튼 */}
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons name="my-location" size={25} color={colors.WHITE} />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    top: 20,
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    elevation: 5, // 안드로이드 그림자 (안드로이드는 shadow 지원 안함)
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 5,
  },
});

export default MapHomeScreen;
