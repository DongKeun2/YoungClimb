import React from 'react';
import {View, Text} from 'react-native';
import CustomMainHeader from '../components/CustomMainHeader';

function ProfileScreen() {
  return (
    <>
      <CustomMainHeader type="프로필" />
      <Text>Profile!</Text>
    </>
  );
}

export default ProfileScreen;
