import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Input from '../../components/Input';
import signup from '../../assets/image/main/signup.png';
import {changeSignupForm} from '../../utils/slices/AccountsSlice';

import CustomButton from '../../components/CustomBtn';

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
});

const FirstPage = ({navigation, signupForm, setPage, updateInput}) => {
  function goNextPage() {
    setPage(true);
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
      <Input
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor={'#ddd'}
        value={signupForm.email.value}
        type={signupForm.email.type}
        onChangeText={value => updateInput('email', value)}
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

export default SignupScreen;
