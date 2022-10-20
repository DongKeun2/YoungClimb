import React from 'react';
import {View, Text, Button} from 'react-native';

function MainScreen({navigation}) {
  return (
    <View>
      <Text>메인화면!</Text>
      <Button title="로그인" onPress={() => navigation.navigate('로그인')} />
      <Button
        title="회원가입"
        onPress={() => navigation.navigate('회원가입')}
      />
    </View>
  );
}

export default MainScreen;
