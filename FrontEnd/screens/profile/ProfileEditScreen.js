import React from 'react';
import {View, Text} from 'react-native';
import CustomSubHeader from '../../components/CustomSubHeader';

function ProfileEditScreen({navigation}) {
  return (
    <>
      <CustomSubHeader title="프로필 설정" navigation={navigation} />
      <Text>설정</Text>
    </>
  );
}

export default ProfileEditScreen;
