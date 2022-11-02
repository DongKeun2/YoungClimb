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
import {useSelector, useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';

import CustomSubHeader from '../../components/CustomSubHeader';
import UserAvatar from '../../components/UserAvatar';
import Input from '../../components/Input';

import {changeEditForm} from '../../utils/slices/AccountsSlice';

import avatar from '../../assets/image/profile/avatar.png';
import checkIcon from '../../assets/image/main/done.png';
import camera from '../../assets/image/main/camera.png';

function ProfileEditScreen({navigation}) {
  const dispatch = useDispatch();

  const [imageUri, setImageUri] = useState(undefined);
  const [isCheckNickname, setIsCheckNickname] = useState(false);

  const editForm = useSelector(state => state.accounts.editForm);

  function updateInput(name, value) {
    dispatch(changeEditForm({name, value}));
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

  // 서브헤더 우측 완료버튼 이벤트
  function onSubmitEdit() {
    console.log('수정해줘');
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomSubHeader
        rightTitle="완료"
        isProfile={true}
        title="프로필 설정"
        navigation={navigation}
        request={onSubmitEdit}
      />
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
          <Text style={styles.labelText}>닉네임</Text>

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
        <View style={styles.introBox}>
          <Text style={styles.labelText}>소개</Text>
          <TextInput
            style={styles.introInput}
            placeholder="소개를 작성해주세요 :)"
            placeholderTextColor={'#ddd'}
            multiline={true}
            textAlignVertical="top"
            onChangeText={value => updateInput('intro', value)}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          placeholder="키(cm)"
          placeholderTextColor={'#ddd'}
          value={editForm.height.value}
          type={editForm.height.type}
          onChangeText={value => updateInput('height', value)}
        />
        <Input
          style={styles.input}
          placeholder="신발(mm)"
          placeholderTextColor={'#ddd'}
          value={editForm.shoeSize.value}
          type={editForm.shoeSize.type}
          onChangeText={value => updateInput('shoeSize', value)}
        />
        <View style={styles.inputBox}>
          <Input
            style={styles.input}
            placeholder="윙스팬(cm)"
            width="100%"
            placeholderTextColor={'#ddd'}
            value={editForm.wingspan.value}
            type={editForm.wingspan.type}
            onChangeText={value => updateInput('wingspan', value)}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('윙스팬', {
                height: editForm.height.value,
                type: 'edit',
              })
            }>
            <Image source={camera} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 20,
    color: '#F34D7F',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nicknameBox: {},
  nicknameLabel: {fontSize: 12},
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '80%',
  },
  introBox: {width: '80%'},
  introInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ADADAD',
    fontSize: 17,
    padding: 5,
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
  cameraIcon: {
    position: 'absolute',
    right: 0,
    top: -30,
  },
  labelText: {
    fontSize: 12,
    color: 'black',
  },
});

export default ProfileEditScreen;
