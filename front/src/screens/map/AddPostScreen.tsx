import {View, Text} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {mapNavigations} from '@/constants';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

//* 넘긴 위치 정보를 파람스를 받아서 사용하기 (route를 파람스로 받을 수 있는데 넘긴 location을 받아서 사용할 수 있음)
const AddPostScreen = ({route}: AddPostScreenProps) => {
  const {location} = route.params;
  return (
    <View>
      <Text>{location.latitude}</Text>
      <Text>{location.longitude}</Text>
    </View>
  );
};

export default AddPostScreen;
