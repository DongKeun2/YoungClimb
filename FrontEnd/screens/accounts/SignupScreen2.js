import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Input from '../../components/Input';
import {
  changeSignupForm,
  checkEmail,
  checkNickname,
  changeIsCheckTerms,
  signup,
} from '../../utils/slices/AccountsSlice';

import CustomButton from '../../components/CustomBtn';

import logo from '../../assets/image/main/signup.png';
import checkIcon from '../../assets/image/main/done.png';
import checked from '../../assets/image/main/checked.png';
import unChecked from '../../assets/image/main/unchecked.png';
import camera from '../../assets/image/main/camera.png';
import BackIcon from '../../assets/image/header/backIcon.svg';
import NextIcon from '../../assets/image/header/nextIcon.svg';

const windowHeight = Dimensions.get('window').height;

function SecondPage({navigation}) {
  const dispatch = useDispatch();

  const signupForm = useSelector(state => state.accounts.signupForm);

  function updateInput(name, value) {
    dispatch(changeSignupForm({name, value}));
  }

  function goBeforePage() {
    navigation.goBack();
  }

  function onSubmitSignup(isSkip) {
    const data = {
      email: signupForm.email.value,
      nickname: signupForm.nickname.value,
      password: signupForm.password.value,
      gender: signupForm.gender.value,
    };

    // 건너뛰기 클릭 시 추가정보 제외하고 회원가입 신청
    if (isSkip) {
      dispatch(signup(data)).then(() => {
        navigation.navigate('완료');
      });
    } else {
      data.height = signupForm.height.value;
      data.shoeSize = signupForm.shoeSize.value;
      data.wingspan = signupForm.shoeSize.value;

      dispatch(signup(data)).then(() => {
        navigation.navigate('완료');
      });
      console.log('확인');
    }
  }

  function goWingspan() {
    if (signupForm.height.value) {
      navigation.navigate('윙스팬', {
        height: signupForm.height.value,
        type: 'signup',
      });
    } else {
      alert('윙스팬 측정을 위해 키를 먼저 입력해주세요.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.title} />
      </View>
      <View style={styles.comment}>
        <Text style={styles.comment}>
          더 즐거운 클라이밍 생활을 위해 상세 정보를 입력해주세요 :)
        </Text>
        <Text style={styles.comment}>
          회원님과 비슷한 유저를 파악하고 정보를 얻을 수 있어요
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          placeholder="키(cm)"
          placeholderTextColor={'#ddd'}
          value={signupForm.height.value}
          maxLength={3}
          type={signupForm.height.type}
          onChangeText={value => updateInput('height', value)}
        />
        <Input
          style={styles.input}
          placeholder="신발(mm)"
          placeholderTextColor={'#ddd'}
          maxLength={3}
          value={signupForm.shoeSize.value}
          type={signupForm.shoeSize.type}
          onChangeText={value => updateInput('shoeSize', value)}
        />
        <View style={styles.inputBox}>
          <Input
            style={styles.input}
            placeholder="윙스팬(cm)"
            width="100%"
            placeholderTextColor={'#ddd'}
            maxLength={3}
            value={signupForm.wingspan.value}
            type={signupForm.wingspan.type}
            onChangeText={value => updateInput('wingspan', value)}
          />
          <TouchableOpacity onPress={goWingspan}>
            <Image source={camera} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnGroup}>
        <View style={styles.button}>
          <CustomButton
            titleColor="#7E7E7E"
            buttonColor="#F3F3F3"
            title="건너뛰기"
            onPress={() => onSubmitSignup(true)}
          />
        </View>
        <View style={styles.button}>
          <CustomButton
            buttonColor="#F34D7F"
            title="완료"
            onPress={() => onSubmitSignup(false)}
          />
        </View>
      </View>
      <TouchableOpacity onPress={goBeforePage} style={styles.before}>
        <BackIcon style={{marginLeft: 5, marginRight: 5}} />
        <Text style={styles.beforeText}>이전</Text>
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
  header: {
    marginTop: windowHeight / 10,
    alignItems: 'center',
    width: '100%',
    height: '15%',
  },
  title: {
    width: '100%',
    resizeMode: 'contain',
  },
  comment: {
    textAlign: 'center',
    color: 'black',
  },
  inputContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '80%',
    height: 60,
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '45%',
  },
  cameraIcon: {
    position: 'absolute',
    right: 0,
    top: -30,
  },
  btnGroup: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  text: {
    color: 'black',
  },
  before: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    // marginTop: 20,
    // color: 'black',
  },
  beforeText: {
    color: 'black',
    fontSize: 16,
  },
});

export default SecondPage;
