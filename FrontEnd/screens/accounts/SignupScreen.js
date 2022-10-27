import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Input from '../../components/Input';
import {
  changeSignupForm,
  changeIsCheckEmail,
  changeIsCheckNickname,
  changeIsCheckTerms,
  signup,
} from '../../utils/slices/AccountsSlice';

import CustomButton from '../../components/CustomBtn';

import logo from '../../assets/image/main/signup.png';
import checkIcon from '../../assets/image/main/done.png';
import checked from '../../assets/image/main/checked.png';
import unChecked from '../../assets/image/main/unchecked.png';
import camera from '../../assets/image/main/camera.png';

function SignupScreen({navigation}) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(false);

  const signupForm = useSelector(state => state.accounts.signupForm);

  function updateInput(name, value) {
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

const FirstPage = ({navigation, signupForm, setPage, updateInput}) => {
  const dispatch = useDispatch();

  const isCheckEmail = useSelector(state => state.accounts.isCheckEmail);
  const isCheckNickname = useSelector(state => state.accounts.isCheckNickname);
  const isCheckTerms = useSelector(state => state.accounts.isCheckTerms);

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
      <Image source={logo} style={styles.title} />
      <View style={styles.inputBox}>
        <Input
          style={styles.input}
          placeholder="닉네임"
          placeholderTextColor={'#ddd'}
          width="78%"
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
      </View>
      <View style={styles.inputBox}>
        <Input
          style={styles.input}
          placeholder="이메일"
          placeholderTextColor={'#ddd'}
          width="78%"
          value={signupForm.email.value}
          type={signupForm.email.type}
          onChangeText={value => updateInput('email', value)}
        />

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
      </View>
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
      <View style={styles.termsGroup}>
        {isCheckTerms ? (
          <TouchableOpacity onPress={() => dispatch(changeIsCheckTerms(false))}>
            <Image source={checked} style={styles.checkBox} alt="checkBox" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('약관')}>
            <Image source={unChecked} style={styles.checkBox} alt="checkBox" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('약관')}>
          <Text style={styles.link}>&nbsp; 약관</Text>
        </TouchableOpacity>
        <Text>&nbsp; 동의</Text>
      </View>
      <View style={styles.linkGroup}>
        <TouchableOpacity onPress={() => navigation.navigate('로그인')}>
          <Text style={styles.link}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goNextPage}>
          <Text style={styles.next}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SecondPage = ({navigation, signupForm, setPage, updateInput}) => {
  const dispatch = useDispatch();

  function goBeforePage() {
    setPage(false);
  }

  function onSubmitSignup(isSkip) {
    const data = {
      email: signupForm.email.value,
      nickname: signupForm.nickname.value,
      password: signupForm.password.value,
      gender: signupForm.gender.value,
    };

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

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.title} />
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
      <View style={styles.inputBox}>
        <Input
          style={styles.input}
          placeholder="윙스팬(cm)"
          width="100%"
          placeholderTextColor={'#ddd'}
          value={signupForm.wingspan.value}
          type={signupForm.wingspan.type}
          onChangeText={value => updateInput('wingspan', value)}
        />
        <TouchableOpacity onPress={() => navigation.navigate('윙스팬')}>
          <Image source={camera} style={styles.cameraIcon} />
        </TouchableOpacity>
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
            buttonColor="#EF3F8F"
            title="완료"
            onPress={() => onSubmitSignup(false)}
          />
        </View>
      </View>
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
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '80%',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '45%',
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
  termsGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  checkBox: {
    width: 20,
    height: 20,
  },
  linkGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  link: {
    color: '#F34D7F',
  },
  next: {},
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
  },

  before: {},
});

export default SignupScreen;
