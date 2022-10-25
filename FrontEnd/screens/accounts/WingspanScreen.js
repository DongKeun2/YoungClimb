import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import wingspan from '../../assets/image/main/wingspan.png';
import CustomButton from '../../components/CustomBtn';

function WingSpanScreen({navigation}) {
  function onSubmitWingSpan() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Image source={wingspan} style={styles.title} />
      <View style={styles.btnGroup}>
        <CustomButton
          buttonColor="#F3F3F3"
          title="취소"
          titleColor="#7E7E7E"
          width="30%"
          onPress={onSubmitWingSpan}
        />
        <CustomButton
          buttonColor="#EF3F8F"
          title="확인"
          width="30%"
          onPress={onSubmitWingSpan}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    marginTop: '5%',
    width: '100%',
    resizeMode: 'contain',
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    width: '90%',
    height: '8%',
  },
});

export default WingSpanScreen;
