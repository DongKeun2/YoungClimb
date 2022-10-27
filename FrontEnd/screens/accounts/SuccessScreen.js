/* eslint-disable no-undef */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

import {profileCreate, testLogin} from '../../utils/slices/AccountsSlice';
import CustomButton from '../../components/CustomBtn';
import UserAvatar from '../../components/UserAvatar';

import avatar from '../../assets/image/profile/avatar.png';

const windowHeight = Dimensions.get('window').height;

function SuccessScreen({navigation}) {
  const dispatch = useDispatch();

  const [imageUri, setImageUri] = useState(undefined);
  const [intro, setIntro] = useState('');

  const SelectProfile = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        console.log(res);
        if (res.didCancel) {
          return;
        }
        setImageUri(res);
        // dispatch(changeUploadImg(res));
      },
    );
    console.log('프로필 사진 변경');
  };

  function onSubmitProfile(isSkip) {
    const match = /\.(\w+)$/.exec(imageUri?.assets[0]?.filename ?? '');
    const type = match ? `image/${match[1]}` : 'image';

    const formdata = new FormData();
    formdata.append('image', {
      uri: imageUri?.assets[0]?.uri,
      name: imageUri?.assets[0]?.filename,
      type,
    });
    formdata.append('data', JSON.stringify({intro}));
    if (isSkip) {
      dispatch(profileCreate(formdata));
    }
    dispatch(testLogin(true));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>회원가입 성공!</Text>
        <Text style={styles.text}>
          프로필을 꾸미고 회원님의 클라이밍을 뽐내보세요!
        </Text>
      </View>
      {imageUri ? (
        <UserAvatar
          source={{uri: imageUri?.assets[0]?.uri}}
          size={100}
          rank={1}
        />
      ) : (
        <TouchableOpacity onPress={SelectProfile}>
          <Image source={avatar} />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={SelectProfile}>
        <Text style={styles.link}>프로필 사진 선택</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="소개를 작성해주세요 :)"
        placeholderTextColor={'#ddd'}
        multiline={true}
        textAlignVertical="top"
        onChangeText={value => setIntro(value)}
      />
      <View style={styles.btnGroup}>
        <View style={styles.button}>
          <CustomButton
            titleColor="#7E7E7E"
            buttonColor="#F3F3F3"
            title="건너뛰기"
            onPress={onSubmitProfile}
          />
        </View>
        <View style={styles.button}>
          <CustomButton
            buttonColor="#F34D7F"
            title="완료"
            onPress={onSubmitProfile}
          />
        </View>
      </View>
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
    marginTop: windowHeight / 15,
    alignItems: 'center',
    width: '100%',
    height: '10%',
  },
  title: {
    fontSize: 20,
    color: '#F34D7F',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ADADAD',
    fontSize: 17,
    padding: 5,
    marginVertical: '3%',
    height: 74,
  },
  btnGroup: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
    height: '10%',
  },
  link: {
    color: '#F34D7F',
  },
});

export default SuccessScreen;
