/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
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

import {
  changeEditForm,
  profileEdit,
  logout,
} from '../../utils/slices/AccountsSlice';
import {changeUploadImg} from '../../utils/slices/ProfileSlice';

import avatar from '../../assets/image/profile/avatar.png';
import checkIcon from '../../assets/image/main/done.png';
import camera from '../../assets/image/main/camera.png';

function ProfileEditScreen({navigation}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.accounts.currentUser);

  const imageUri = useSelector(state => state.profile.uploadImg);
  const [isCheckNickname, setIsCheckNickname] = useState(false);

  const editForm = useSelector(state => state.accounts.editForm);

  function updateInput(name, value) {
    dispatch(changeEditForm({name, value}));
  }

  function checkNickname(nickname) {
    setIsCheckNickname(!isCheckNickname);
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

  useEffect(() => {
    dispatch(changeEditForm({name: 'nickname', value: currentUser.nickname}));
    dispatch(changeEditForm({name: 'height', value: currentUser.height}));
    dispatch(changeEditForm({name: 'shoeSize', value: currentUser.shoeSize}));
    dispatch(changeEditForm({name: 'wingspan', value: currentUser.wingspan}));
    dispatch(changeEditForm({name: 'intro', value: currentUser.intro}));
    console.log('프로필 설정 입장');
  }, [dispatch, currentUser]);

  // 서브헤더 우측 완료버튼 이벤트
  function onSubmitEdit() {
    console.log('저장된 uri', imageUri.assets[0].uri);
    const match = /\.(\w+)$/.exec(imageUri?.assets[0]?.fileName ?? '');
    const type = match ? `image/${match[1]}` : 'image';

    console.log(match);
    console.log(type);

    const formdata = new FormData();
    formdata.append('file', {
      uri: imageUri?.assets[0]?.uri,
      name: imageUri?.assets[0]?.fileName,
      type,
    });

    const data = new Blob(
      [
        JSON.stringify({
          email: currentUser.email,
          nickname: editForm.intro.value,
          intro: editForm.intro.value,
          height: editForm.height.value,
          shoeSize: editForm.shoeSize.value,
          wingspan: editForm.wingspan.value,
        }),
      ],
      {type: 'application/json'},
    );

    console.log('유저 정보', currentUser);

    formdata.append('memberInfo', data);
    dispatch(profileEdit(formdata)).then(() => {
      console.log('저장된 uri', imageUri?.assets[0]?.filename);
    });
  }

  return (
    <View style={styles.container}>
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
          <TouchableOpacity onPress={selectProfile}>
            <Image source={avatar} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={selectProfile}>
          <Text style={styles.link}>프로필 사진 변경</Text>
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
        <Text style={styles.inputText}>키</Text>
        <Input
          style={styles.input}
          placeholder={'키(cm)'}
          placeholderTextColor={'#ddd'}
          value={editForm.height.value}
          type={editForm.height.type}
          onChangeText={value => updateInput('height', value)}
        />
        <Text style={styles.inputText}>신발 사이즈</Text>
        <Input
          style={styles.input}
          placeholder={'신발(mm)'}
          placeholderTextColor={'#ddd'}
          value={editForm.shoeSize.value}
          type={editForm.shoeSize.type}
          onChangeText={value => updateInput('shoeSize', value)}
        />
        <Text style={styles.inputText}>윙스팬</Text>
        <View style={styles.inputBox}>
          <Input
            style={styles.input}
            placeholder={'윙스팬(cm)'}
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
      <TouchableOpacity onPress={() => dispatch(logout())}>
        <Text style={styles.link}>로그아웃</Text>
      </TouchableOpacity>
    </View>
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
  inputText: {
    color: 'black',
    justifyContent: 'center',
    width: '80%',
    marginTop: 30,
    marginBottom: -20,
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
});

export default ProfileEditScreen;
