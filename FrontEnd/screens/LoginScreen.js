import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, Button} from 'react-native';
import {testLogin} from '../utils/slices/AccountsSlice';

function LoginScreen() {
  const dispatch = useDispatch();

  function handleLogin() {
    dispatch(testLogin(true));
  }
  return (
    <View>
      <Text>로그인 화면!</Text>
      <Button title="로그인하기" onPress={handleLogin} />
    </View>
  );
}

export default LoginScreen;
