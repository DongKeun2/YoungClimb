import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {login, testLogin} from '../../utils/slices/AccountsSlice';

import Input from '../../components/Input';
import CustomButton from '../../components/CustomBtn';
import title from '../../assets/image/main/title.png';

const windowHeight = Dimensions.get('window').height;

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

  function onSubmitLogin() {
    // 임시 로그인
    dispatch(testLogin(true));

    // const data = {
    //   email: loginForm.email.value,
    //   password: loginForm.email.value,
    // };
    // dispatch(login(data));
  }
  return (
    <View style={styles.container}>
      <View stlye={styles.header}>
        <Image source={title} style={styles.title} />
      </View>
      <View style={styles.inputGroup}>
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
      </View>
      <View style={styles.button}>
        <CustomButton
          buttonColor="#EF3F8F"
          title="로그인"
          onPress={onSubmitLogin}
        />
      </View>
      <View style={styles.linkGroup}>
        <Text style={styles.text}>회원이 아니신가요? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('회원가입')}>
          <Text style={styles.link}>회원가입</Text>
        </TouchableOpacity>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
  },
  logo: {
    margin: 30,
  },
  title: {
    resizeMode: 'contain',
  },
  inputGroup: {
    marginBottom: '10%',
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {},
  button: {
    width: '80%',
  },
  linkGroup: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    color: 'black',
  },
  link: {
    color: '#F34D7F',
  },
});

export default LoginScreen;
