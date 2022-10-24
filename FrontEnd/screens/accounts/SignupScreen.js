import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Input from '../../components/Input';
import {
  changeSignupForm,
  changeIsCheckEmail,
  changeIsCheckNickname,
} from '../../utils/slices/AccountsSlice';

import CustomButton from '../../components/CustomBtn';

import signup from '../../assets/image/main/signup.png';
import checkIcon from '../../assets/image/main/done.png';

function SignupScreen({navigation}) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(false);

  const signupForm = useSelector(state => state.accounts.signupForm);

  function updateInput(name, value) {
    console.log(name, value);
    dispatch(changeSignupForm({name, value}));
  }

  if (page) {
    return (
      <SecondPage
        navigation={navigation}
        signupForm={signupForm}
        setPage={setPage}
        updateInput={updateInput}
      />
    );
  } else {
    return (
      <FirstPage
        navigation={navigation}
        signupForm={signupForm}
        setPage={setPage}
        updateInput={updateInput}
      />
    );
  }
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
  genderGroup: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  gender: {
    width: '45%',
  },
  link: {
    color: '#F34D7F',
  },
  next: {},
  before: {},
  checkBtn: {
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1.5,
    width: 60,
    height: 40,
  },
  checkTitle: {
    fontSize: 15,
  },
});

const FirstPage = ({navigation, signupForm, setPage, updateInput}) => {
  const dispatch = useDispatch();

  const isCheckEmail = useSelector(state => state.accounts.isCheckEmail);
  const isCheckNickname = useSelector(state => state.accounts.isCheckNickname);

  function goNextPage() {
    setPage(true);
  }

  function checkEmail() {
    dispatch(changeIsCheckEmail(!isCheckEmail));
  }
  function checkNickname() {
    dispatch(changeIsCheckNickname(!isCheckNickname));
  }

  return (
    <View style={styles.container}>
      <Image source={signup} style={styles.title} />
      <Input
        style={styles.input}
        placeholder="닉네임"
        placeholderTextColor={'#ddd'}
        value={signupForm.nickname.value}
        type={signupForm.nickname.type}
        onChangeText={value => updateInput('nickname', value)}
      />
      <CheckButton
        type="nickname"
        onPress={checkNickname}
        buttonColor={isCheckNickname ? '#EF3F8F' : 'white'}
        borderColor={!isCheckNickname && '#EF3F8F'}
        title={
          isCheckNickname ? (
            <Image source={checkIcon} />
          ) : (
            <Text style={styles.checkTitle}>확인</Text>
          )
        }
      />

      <Input
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor={'#ddd'}
        value={signupForm.email.value}
        type={signupForm.email.type}
        onChangeText={value => updateInput('email', value)}
      />
      <Image source={checkIcon} />
      <CheckButton
        type="email"
        onPress={checkEmail}
        buttonColor={isCheckEmail ? '#EF3F8F' : 'white'}
        borderColor={!isCheckEmail && '#EF3F8F'}
        borderWidth="3"
        title={
          isCheckEmail ? (
            <Image source={checkIcon} />
          ) : (
            <Text style={styles.checkTitle}>확인</Text>
          )
        }
      />
      <Input
        style={styles.input}
        value={signupForm.password.value}
        type={signupForm.password.type}
        secureTextEntry={true}
        placeholder="비밀번호"
        placeholderTextColor={'#ddd'}
        onChangeText={value => updateInput('password', value)}
      />
      <Input
        style={styles.input}
        value={signupForm.confirmPwd.value}
        type={signupForm.confirmPwd.type}
        secureTextEntry={true}
        placeholder="비밀번호 확인"
        placeholderTextColor={'#ddd'}
        onChangeText={value => updateInput('confirmPwd', value)}
      />
      <View style={styles.genderGroup}>
        <View style={styles.gender}>
          <CustomButton
            buttonColor={
              signupForm.gender.value === 'M' ? '#EF3F8F' : '#F3F3F3'
            }
            titleColor={signupForm.gender.value === 'M' ? 'white' : '#7E7E7E'}
            title="남성"
            onPress={() => updateInput('gender', 'M')}
          />
        </View>

        <View style={styles.gender}>
          <CustomButton
            buttonColor={
              signupForm.gender.value === 'F' ? '#EF3F8F' : '#F3F3F3'
            }
            titleColor={signupForm.gender.value === 'F' ? 'white' : '#7E7E7E'}
            title="여성"
            onPress={() => updateInput('gender', 'F')}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('약관')}>
        <Text style={styles.link}>약관</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goNextPage}>
        <Text style={styles.next}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const SecondPage = ({navigation, signupForm, setPage, updateInput}) => {
  function goBeforePage() {
    setPage(false);
  }

  return (
    <View style={styles.container}>
      <Image source={signup} style={styles.title} />
      <Input
        style={styles.input}
        placeholder="키(cm)"
        placeholderTextColor={'#ddd'}
        value={signupForm.height.value}
        type={signupForm.height.type}
        onChangeText={value => updateInput('height', value)}
      />
      <Input
        style={styles.input}
        placeholder="신발(mm)"
        placeholderTextColor={'#ddd'}
        value={signupForm.shoeSize.value}
        type={signupForm.shoeSize.type}
        onChangeText={value => updateInput('shoeSize', value)}
      />
      <Input
        style={styles.input}
        placeholder="윙스팬(cm)"
        placeholderTextColor={'#ddd'}
        value={signupForm.wingSpan.value}
        type={signupForm.wingSpan.type}
        onChangeText={value => updateInput('wingSpan', value)}
      />
      <TouchableOpacity onPress={() => navigation.navigate('윙스팬')}>
        <Text style={styles.link}>윙스팬 측정</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBeforePage}>
        <Text style={styles.before}>이전</Text>
      </TouchableOpacity>
    </View>
  );
};

function CheckButton({onPress, buttonColor, borderColor, title}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.checkBtn,
        {
          backgroundColor: buttonColor,
          borderColor,
        },
      ]}>
      {title}
    </TouchableOpacity>
  );
}

export default SignupScreen;
