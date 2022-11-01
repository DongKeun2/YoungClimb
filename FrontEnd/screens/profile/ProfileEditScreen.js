/* eslint-disable no-undef */
import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';

import CustomSubHeader from '../../components/CustomSubHeader';
import UserAvatar from '../../components/UserAvatar';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomBtn';

import avatar from '../../assets/image/profile/avatar.png';
import checkIcon from '../../assets/image/main/done.png';

function ProfileEditScreen({navigation}) {
  const [imageUri, setImageUri] = useState(undefined);
  const [isCheckNickname, setIsCheckNickname] = useState(false);

  const [editForm, setForm] = useState({
    nickname: {
      value: '',
      type: 'textInput',
      valid: false,
    },
    password: {
      value: '',
      type: 'textInput',
    },
    intro: {
      value: '',
      type: 'textInput',
    },
  });

  function updateInput(name, value) {
    let formCopy = editForm;
    formCopy[name].value = value;
    setForm(editForm => {
      return {...formCopy};
    });
  }

  function checkNickname(nickname) {
    setIsCheckNickname(!isCheckNickname);
  }

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

  return (
    <SafeAreaView style={styles.container}>
      <CustomSubHeader title="프로필 설정" navigation={navigation} />
      <View style={styles.inputContainer}>
        {imageUri ? (
          <UserAvatar source={{uri: imageUri?.assets[0]?.uri}} size={100} />
        ) : (
          <TouchableOpacity onPress={SelectProfile}>
            <Image source={avatar} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={SelectProfile}>
          <Text style={styles.link}>프로필 사진 변경</Text>
        </TouchableOpacity>
        <View style={styles.nicknameBox}>
          <Text style={styles.nicknameLabel}>닉네임</Text>

          <View style={styles.inputBox}>
            <Input
              style={styles.input}
              placeholder="닉네임"
              placeholderTextColor={'#ddd'}
              width="78%"
              value={editForm.nickname.value}
              type={editForm.nickname.type}
              onChangeText={value => updateInput('nickname', value)}
            />
            <CheckButton
              type="nickname"
              onPress={checkNickname}
              buttonColor={isCheckNickname ? '#F34D7F' : 'white'}
              borderColor={!isCheckNickname && '#F34D7F'}
              title={
                isCheckNickname ? (
                  <Image source={checkIcon} />
                ) : (
                  <Text style={styles.checkTitle}>확인</Text>
                )
              }
            />
          </View>
        </View>
        <TextInput
          style={styles.introInput}
          placeholder="소개를 작성해주세요 :)"
          placeholderTextColor={'#ddd'}
          multiline={true}
          textAlignVertical="top"
          onChangeText={value => updateInput('intro', value)}
        />
      </View>
    </SafeAreaView>
  );
}

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
  header: {
    alignItems: 'center',
    width: '100%',
    height: '10%',
  },
  title: {
    fontSize: 20,
    color: '#F34D7F',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 30,
  },
  nicknameBox: {
    width: '80%',
  },
  nicknameLabel: {fontSize: 12},
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },
  introInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ADADAD',
    fontSize: 17,
    padding: 5,
    marginVertical: '10%',
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
  },
  text: {
    margin: 10,
    color: 'black',
  },
  link: {
    color: '#F34D7F',
  },
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
    color: 'black',
  },
});

export default ProfileEditScreen;
