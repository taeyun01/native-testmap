import {colors} from '@/constants';
import {MarkerColor} from '@/types/domain';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LatLng, MapMarkerProps, Marker} from 'react-native-maps';

interface CustomMarkerProps extends MapMarkerProps {
  coordinate: LatLng;
  color: MarkerColor;
  score?: number;
}

// props로 받은 color에 따라 그에 맞는 색상을 넣어주기 위해 설정
const colorHex = {
  RED: colors.PINK_400,
  BLUE: colors.BLUE_400,
  GREEN: colors.GREEN_400,
  YELLOW: colors.YELLOW_400,
  PURPLE: colors.PURPLE_400,
};

//* 마커 커스텀 컴포넌트로 만들기 (스코어(점수)에 따라 표정이 변하도록 마커 구현하기)
const CustomMarker = ({
  coordinate,
  color,
  score = 5, // 기본값 5점
  ...props
}: CustomMarkerProps) => {
  return (
    <Marker coordinate={coordinate} {...props}>
      <View style={styles.container}>
        <View style={[styles.marker, {backgroundColor: colorHex[color]}]}>
          <View style={[styles.eye, styles.leftEye]} />
          <View style={[styles.eye, styles.rightEye]} />
          {/* 스코어에 따라 표정이 변하게 */}
          {score > 3 && <View style={[styles.mouth, styles.good]} />}
          {score === 3 && <View style={styles.soso} />}
          {score < 3 && <View style={[styles.mouth, styles.bad]} />}
        </View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 32,
    alignItems: 'center',
  },
  marker: {
    transform: [{rotate: '45deg'}],
    width: 27,
    height: 27,
    borderRadius: 27,
    borderBottomRightRadius: 1,
    borderWidth: 1,
    borderColor: colors.BLACK,
  },
  eye: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    width: 4,
    height: 4,
    borderRadius: 4,
  },
  leftEye: {
    top: 12,
    left: 5,
  },
  rightEye: {
    top: 5,
    left: 12,
  },
  mouth: {
    transform: [{rotate: '45deg'}],
    borderTopColor: 'rgba(255,255,255 / 0.01)',
    borderBottomColor: 'rgba(255,255,255 / 0.01)',
    width: 12,
    height: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  good: {
    transform: [{rotate: '225deg'}],
    marginLeft: 5,
    marginTop: 5,
    borderRightColor: 'rgba(255,255,255 / 0.01)',
    borderLeftColor: colors.BLACK,
  },
  soso: {
    transform: [{rotate: '45deg'}],
    marginLeft: 13,
    marginTop: 13,
    width: 8,
    height: 8,
    borderLeftColor: colors.BLACK,
    borderLeftWidth: 1,
  },
  bad: {
    borderRightColor: 'rgba(255,255,255 / 0.01)',
    borderLeftColor: colors.BLACK,
    marginLeft: 12,
    marginTop: 12,
  },
});

export default CustomMarker;
