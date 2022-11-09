/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';

import CustomSubHeader from '../../components/CustomSubHeader';
import UserAvatar from '../../components/UserAvatar';
import Input from '../../components/Input';

import {
  changeEditForm,
  profileEdit,
  logout,
} from '../../utils/slices/AccountsSlice';
import {changeUploadImg, checkNickname} from '../../utils/slices/ProfileSlice';

import avatar from '../../assets/image/profile/avatar.png';
import checkIcon from '../../assets/image/main/done.png';
import camera from '../../assets/image/main/camera.png';
import {useIsFocused} from '@react-navigation/native';

function ProfileEditScreen({navigation}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.accounts.currentUser);

  const imageUri = useSelector(state => state.profile.uploadImg);
  const [isCheckNickname, setIsCheckNickname] = useState(true);

  const editForm = useSelector(state => state.accounts.editForm);

  function updateInput(name, value) {
    if (name === 'nickname') {
      setIsCheckNickname(false);
    }
    dispatch(changeEditForm({name, value}));
  }

  function onCheckNickname() {
    if (editForm.nickname.value === currentUser.nickname) {
      setIsCheckNickname(true);
    } else if (editForm.nickname.value) {
      const data = {nickname: editForm.nickname.value};
      dispatch(checkNickname(data)).then(res => {
        if (res.type === 'checkNickname/fulfilled') {
          setIsCheckNickname(res.payload);
        }
      });
    } else {
      alert('닉네임을 입력해주세요.');
    }
  }

  const selectProfile = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          return;
        }
        dispatch(changeUploadImg(res));
      },
    );
    console.log('프로필 사진 변경');
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(changeEditForm({name: 'nickname', value: currentUser.nickname}));
    dispatch(changeEditForm({name: 'height', value: currentUser.height}));
    dispatch(changeEditForm({name: 'shoeSize', value: currentUser.shoeSize}));
    dispatch(changeEditForm({name: 'wingspan', value: currentUser.wingspan}));
    dispatch(changeEditForm({name: 'intro', value: currentUser.intro}));
    console.log('프로필 설정 입장');
  }, [dispatch, currentUser, isFocused]);

  // 서브헤더 우측 완료버튼 이벤트
  function onSubmitEdit() {
    if (!isCheckNickname) {
      alert('닉네임을 확인해주세요.');
      return;
    }
    console.log('저장된 uri', imageUri?.assets[0]);
    const match = /\.(\w+)$/.exec(imageUri?.assets[0]?.fileName ?? '');
    const type = match ? `image/${match[1]}` : 'image';

    console.log(type);
    const uri = imageUri?.assets[0]?.uri.replace(/\r?\n?/g, '').trim();

    let formData = new FormData();

    const imgFile = {
      uri: uri,
      name: imageUri?.assets[0]?.fileName,
      type: type,
    };

    const data = {
      nickname: editForm.nickname.value,
      intro: editForm.intro.value,
      heigh: editForm.height.value,
      shoeSize: editForm.shoeSize.value,
      wingspan: editForm.wingspan.value,
    };

    formData.append(
      'key',
      new Blob([JSON.stringify(data)], {type: 'application/json'}),
    );

    formData.append('file', imgFile);

    dispatch(profileEdit({data, formData}));
  }

  return (
    <>
      <CustomSubHeader
        rightTitle="완료"
        isProfile={true}
        title="프로필 설정"
        navigation={navigation}
        request={onSubmitEdit}
      />
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={selectProfile}>
            {imageUri ? (
              <UserAvatar source={{uri: imageUri?.assets[0]?.uri}} size={100} />
            ) : (
              <UserAvatar
                source={{
                  uri: 'https://youngclimb.s3.ap-northeast-2.amazonaws.com/userProfile/KakaoTalk_20221108_150615819.png',
                }}
                size={100}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={selectProfile}>
            <Text style={styles.link}>프로필 사진 변경</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(changeUploadImg(''));
            }}>
            <Text style={styles.link}>사진 초기화</Text>
          </TouchableOpacity>

          <View style={styles.nicknameBox}>
            <Text style={styles.inputText}>닉네임</Text>
            <View style={styles.inputBox}>
              <Input
                style={styles.input}
                placeholder={'닉네임을 입력해주세요.'}
                placeholderTextColor={'#ddd'}
                width="78%"
                value={editForm.nickname.value}
                type={editForm.nickname.type}
                onChangeText={value => updateInput('nickname', value)}
              />
              <CheckButton
                type="nickname"
                onPress={onCheckNickname}
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
            <Text style={styles.introText}>소개</Text>
            <TextInput
              style={styles.introInput}
              placeholder={'소개를 작성해주세요 :)'}
              placeholderTextColor={'#ddd'}
              multiline={true}
              textAlignVertical="top"
              onChangeText={value => updateInput('intro', value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>키 (cm)</Text>
          <Input
            style={styles.input}
            placeholder={'키를 입력해주세요.'}
            placeholderTextColor={'#ddd'}
            value={editForm.height.value.toString()}
            type={editForm.height.type}
            onChangeText={value => updateInput('height', value)}
          />
          <Text style={styles.inputText}>신발 사이즈 (mm)</Text>
          <Input
            style={styles.input}
            placeholder={'신발 사이즈를 입력해주세요.'}
            placeholderTextColor={'#ddd'}
            value={editForm.shoeSize?.value.toString()}
            type={editForm.shoeSize.type}
            onChangeText={value => updateInput('shoeSize', value)}
          />
          <Text style={styles.inputText}>윙스팬 (cm)</Text>
          <View style={styles.inputBox}>
            <Input
              style={styles.input}
              placeholder={'윙스팬을 입력해주세요.'}
              width="100%"
              placeholderTextColor={'#ddd'}
              value={editForm.wingspan.value.toString()}
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
          <TouchableOpacity
            style={styles.logout}
            onPress={() => dispatch(logout())}>
            <Text style={styles.link}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
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
  inputText: {
    color: 'black',
    justifyContent: 'center',
    width: '80%',
    marginTop: 30,
    marginBottom: -20,
  },
  nicknameBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  nicknameLabel: {fontSize: 12},
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '80%',
  },
  introBox: {width: '85%', marginTop: 20},
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
    marginTop: 10,
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
  introText: {
    fontSize: 12,
    marginBottom: 10,
    color: 'black',
  },
  logout: {
    marginBottom: 30,
  },
});

export default ProfileEditScreen;
