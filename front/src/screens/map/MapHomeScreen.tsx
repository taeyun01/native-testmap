import {StyleSheet} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
// import useAuth from '@/hooks/queries/useAuth';

const MapHomeScreen = () => {
  // const {logoutMutation} = useAuth();

  return (
    <MapView
      style={styles.container}
      provider={PROVIDER_GOOGLE}
      showsUserLocation // 현재 내 위치 표시
      followsUserLocation // 내 위치 표시 후 내 위치 표시 유지
      showsMyLocationButton={true} // 현재 위치로 이동하는 버튼 (직접 구현할거라서 false)
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapHomeScreen;
