import React from 'react';
import {View, Text} from 'react-native';
import CustomSubHeader from '../../components/CustomSubHeader';

function FollowScreen({navigation}) {
  return (
    <>
      <CustomSubHeader title="팔로우" navigation={navigation} />
      <Text>팔로우</Text>
    </>
  );
}

export default FollowScreen;
