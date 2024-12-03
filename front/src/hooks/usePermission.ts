import {alerts} from '@/constants';
import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  Permission,
} from 'react-native-permissions';

type PermissionType = 'LOCATION' | 'PHOTO'; // 권한 타입

type PermissionOS = {
  [key in PermissionType]: Permission; // key가 PermissionType이면서 값은 Permission인 객체
};

const androidPermissons: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissons: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

// type에 따라 권한 체크 및 요청 (type이 위치(LOCATION)일 경우 위치 권한 요청, 사진(PHOTO)일 경우 사진 권한 요청)
const usePermission = (type: PermissionType) => {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid ? androidPermissons : iosPermissons;
      const checked = await check(permissionOS[type]);
      // console.log('checked', checked);

      const showPermissionAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            {
              text: '설정하기',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '취소',
              style: 'cancel',
            },
          ],
        ); // 제목, 설명, 버튼옵션
      };

      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert();
          }
          await request(permissionOS[type]);
          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert();
          break;
        default:
          break;
      }
    })();
  }, [type]);
};

export default usePermission;
