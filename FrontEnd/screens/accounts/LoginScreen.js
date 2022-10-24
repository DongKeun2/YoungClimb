import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {testLogin} from '../../utils/slices/AccountsSlice';

import Input from '../../components/Input';
import CustomButton from '../../components/CustomBtn';
import title from '../../assets/image/main/title.png';

function LoginScreen({navigation}) {
  const dispatch = useDispatch();

  const [loginForm, setForm] = useState({
    email: {
      value: '',
      type: 'textInput',
      rules: {},
      valid: false,
    },
    password: {
      value: '',
      type: 'textInput',
      rules: {},
      valid: false,
    },
  });

  function updateInput(name, value) {
    let formCopy = loginForm;
    formCopy[name].value = value;
    setForm(loginForm => {
      return {...formCopy};
    });
  }

  function handleLogin() {
    dispatch(testLogin(true));
    console.log(loginForm.email.value);
    console.log(loginForm.password.value);
  }
  return (
    <View style={styles.container}>
      <Image source={title} style={styles.title} />
      <Input
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor={'#ddd'}
        value={loginForm.email.value}
        type={loginForm.email.type}
        onChangeText={value => updateInput('email', value)}
      />
      <Input
        style={styles.input}
        value={loginForm.password.value}
        type={loginForm.password.type}
        secureTextEntry={true}
        placeholder="비밀번호"
        placeholderTextColor={'#ddd'}
        onChangeText={value => updateInput('password', value)}
      />
      <View style={styles.button}>
        <CustomButton
          buttonColor="#EF3F8F"
          title="로그인하기"
          onPress={handleLogin}
        />
      </View>
      <Text>회원이 아니신가요?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('회원가입')}>
        <Text style={styles.link}>회원가입</Text>
      </TouchableOpacity>
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
  input: {},
  button: {
    width: '80%',
    height: '10%',
  },
  link: {
    color: '#F34D7F',
  },
});

export default LoginScreen;
