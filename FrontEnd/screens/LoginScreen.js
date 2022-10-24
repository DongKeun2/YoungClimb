import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {testLogin} from '../utils/slices/AccountsSlice';

import CustomButton from '../components/CustomBtn';

function LoginScreen() {
  const dispatch = useDispatch();

  function handleLogin() {
    dispatch(testLogin(true));
  }
  return (
    <View style={styles.container}>
      <Text>로그인 화면!</Text>
      <View style={styles.btnGroup}>
        <CustomButton
          buttonColor="#EF3F8F"
          title="로그인하기"
          onPress={handleLogin}
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
    height: '11%',
  },
});

export default LoginScreen;
