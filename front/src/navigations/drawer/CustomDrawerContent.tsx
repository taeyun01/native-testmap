import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import {Profile} from '@/types/domain';

// 커스텀 컴포넌트로 만들어서 사용자 정보 불러오기
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {getProfileQuery} = useAuth(); // 사용자 정보 불러오기
  const {email, nickname, imageUri, kakaoImageUri} = (getProfileQuery.data ||
    {}) as Profile;

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            {/* 이메일 로그인, 카카오 로그인 시 둘다 이미지가 없는 경우 기본 이미지 표시 */}
            {!imageUri && !kakaoImageUri && (
              <Image
                source={require('@/assets/google.png')}
                style={styles.userImage}
              />
            )}

            {/* 카카오 로그인을 한 유저이면서 자신의 프로필 이미지를 앱에 저장하는 것을 허용한 유저인 경우. 사용자의 이미지는 없고 카카오 이미지만 있는 경우에는 카카오 이미지를 표시 */}
            {!imageUri && !!kakaoImageUri && (
              <Image source={{uri: kakaoImageUri}} style={styles.userImage} />
            )}

            {/* 사용자가 이미지를 업로드 했을 경우 서버에서 이미지를 보내주는데, 이미지url이 있으면 이미지를 표시 */}
            {imageUri && (
              <Image source={{uri: imageUri}} style={styles.userImage} /> // 파일이 나닌 url을 넣어줄때는 {uri: 이미지url} 을 해주면됨
            )}
          </View>
          <Text style={styles.nickname}>{nickname ?? email}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 30,
    marginHorizontal: 15, // 좌우 마진
  },
  nickname: {
    color: colors.BLACK,
  },
  userImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
});

export default CustomDrawerContent;
