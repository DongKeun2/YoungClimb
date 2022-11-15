import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

import CustomSubHeader from '../../components/CustomSubHeader';

function ShareScreen({navigation}) {
  return (
    <>
      <CustomSubHeader title={'공유하기'} navigation={navigation} />
      <Text style={styles.text}>공유하기 페이지</Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {color: 'black'},
});

export default ShareScreen;
