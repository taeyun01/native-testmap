import useAppState from '@/hooks/useAppState';
import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118, // 만약 사용자가 위치권한을 허용하지 않을 때 초기값 (아무거나 표시)
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComback} = useAppState();
  console.log('isComback', isComback);

  // 위치 버튼을 눌렀을때 현재 위치 표시
  // 1. 나의 위치를 구하고
  // 2. 지도를 그곳으로 이동 (geolocation을 이용하면 현재 위치를 구할 수 있는 함수를 쓸 수 있음)
  useEffect(() => {
    // 현재 위치 구하기
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({latitude, longitude}); // 현재 위치 저장
        setIsUserLocationError(false);
      },
      // 두번째 인자로 에러 상태를 표시해 줄 수도 있음
      () => {
        setIsUserLocationError(true);
      },
      // 세번째는 옵션을 지정할 수 있음
      {
        enableHighAccuracy: true, // 정확도 높이기
      },
    );
  }, [isComback]);

  return {userLocation, isUserLocationError};
};

export default useUserLocation;
