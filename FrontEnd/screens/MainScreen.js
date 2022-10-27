import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import CustomButton from '../components/CustomBtn';

import logo from '../assets/image/main/logo.png';
import title from '../assets/image/main/title.png';

function MainScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />

        <Image source={title} style={styles.title} />
      </View>
      <View style={styles.button}>
        <CustomButton
          buttonColor="#EF3F8F"
          title="로그인"
          onPress={() => navigation.navigate('로그인')}
        />
      </View>
      <View style={styles.button}>
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
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
  },
  logo: {},
  title: {
    width: '100%',
    resizeMode: 'contain',
  },
  button: {
    width: '80%',
    height: '10%',
  },
});

export default MainScreen;
