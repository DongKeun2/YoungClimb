import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {changeSignupForm, signup} from '../../utils/slices/AccountsSlice';

import CustomButton from '../../components/CustomBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../../assets/image/main/signup.png';
import Camera from '../../assets/image/main/camera.svg';
import BackIcon from '../../assets/image/header/backIcon.svg';

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

  async function onSubmitSignup(isSkip) {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    const data = {
      email: signupForm.email.value,
      nickname: signupForm.nickname.value,
      password: signupForm.password.value,
      gender: signupForm.gender.value,
      fcmToken: fcmToken.replace('"', '').replace('"', ''),
    };

    // 건너뛰기 클릭 시 추가정보 제외하고 회원가입 신청
    if (!isSkip) {
      data.height = signupForm.height.value ? signupForm.height.value : 0;
      data.shoeSize = signupForm.shoeSize.value ? signupForm.shoeSize.value : 0;
      data.wingspan = signupForm.wingspan.value ? signupForm.wingspan.value : 0;
    }

    dispatch(signup(data)).then(res => {
      if (res.type === 'signup/rejected') {
        Alert.alert('회원정보 확인', '회원가입에 실패하였습니다.');
      } else {
        navigation.navigate('완료');
      }
    });
  }

  function goWingspan() {
    if (signupForm.height.value) {
      navigation.navigate('윙스팬', {
        height: signupForm.height.value,
        type: 'signup',
      });
    } else {
      Alert.alert(
        '회원정보 확인',
        '윙스팬 측정을 위해 키를 먼저 입력해주세요.',
      );
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
        <View style={styles.inputForm}>
          <Text style={styles.inputText}>키 (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="키를 입력해주세요."
            placeholderTextColor={'#ddd'}
            value={signupForm.height.value}
            maxLength={3}
            type={signupForm.height.type}
            onChangeText={value => updateInput('height', value)}
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputText}>신발 (mm)</Text>
          <TextInput
            style={styles.input}
            placeholder="신발 사이즈를 입력해주세요."
            placeholderTextColor={'#ddd'}
            maxLength={3}
            value={signupForm.shoeSize.value}
            type={signupForm.shoeSize.type}
            onChangeText={value => updateInput('shoeSize', value)}
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputText}>윙스팬 (cm)</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="윙스팬을 입력해주세요."
              width="100%"
              placeholderTextColor={'#ddd'}
              maxLength={3}
              value={signupForm.wingspan.value}
              type={signupForm.wingspan.type}
              onChangeText={value => updateInput('wingspan', value)}
            />
            <TouchableOpacity onPress={goWingspan}>
              <Camera style={styles.cameraIcon} width={30} height={30} />
            </TouchableOpacity>
          </View>
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
        <BackIcon style={{marginRight: 5}} />
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
    width: '60%',
  },
  input: {
    fontSize: 14,
    color: 'black',
    width: '65%',
    padding: 5,
    marginTop: 30,
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
    marginTop: 30,
    width: '85%',
    // marginTop: 20,
    // color: 'black',
  },
  beforeText: {
    color: 'black',
    fontSize: 16,
  },
  inputForm: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#464646',
  },
  inputText: {
    color: '#525050',
    justifyContent: 'center',
    width: '35%',
    marginTop: 30,
  },
});

export default SecondPage;
