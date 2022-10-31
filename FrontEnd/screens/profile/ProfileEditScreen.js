import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import CustomSubHeader from '../../components/CustomSubHeader';

function ProfileEditScreen({navigation}) {
  return (
    <>
      <CustomSubHeader title="프로필 설정" navigation={navigation} />
      <Text style={styles.text}>설정</Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});

export default ProfileEditScreen;
