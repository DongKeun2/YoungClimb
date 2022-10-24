import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomButton from '../components/CustomBtn';

function MainScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.logo} />
      <View style={styles.btnGroup}>
        <CustomButton
          buttonColor="#EF3F8F"
          title="로그인"
          onPress={() => navigation.navigate('로그인')}
        />
        <CustomButton
          buttonColor="#F34D7F"
          title="회원가입"
          onPress={() => navigation.navigate('회원가입')}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '50%',
  },
  btnGroup: {
    width: '80%',
    height: '20%',
  },
});

export default MainScreen;
