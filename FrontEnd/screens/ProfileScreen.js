import React from 'react';
import {View, Text} from 'react-native';
import CustomMainHeader from '../components/CustomMainHeader';

function ProfileScreen({navigation}) {
  return (
    <>
      <CustomMainHeader type="프로필" navigation={navigation} />
      <Text>Profile!</Text>
    </>
  );
}

export default ProfileScreen;
