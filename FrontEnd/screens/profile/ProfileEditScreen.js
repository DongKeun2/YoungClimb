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
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

import CustomSubHeader from '../../components/CustomSubHeader';
import UserAvatar from '../../components/UserAvatar';
import Input from '../../components/Input';

import {
  changeEditForm,
  profileEdit,
  logout,
  saveImage,
} from '../../utils/slices/AccountsSlice';
import {changeUploadImg, checkNickname} from '../../utils/slices/ProfileSlice';

import Camera from '../../assets/image/main/camera.svg';
import checkIcon from '../../assets/image/main/done.png';

function ProfileEditScreen({navigation}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.accounts.currentUser);

  const imageUri = useSelector(state => state.profile.uploadImg);
  const [isCheckNickname, setIsCheckNickname] = useState(true);
  const [isChange, setIsChange] = useState(false);

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
      Alert.alert('프로필 수정', '닉네임을 입력해주세요.');
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
        setIsChange(true);
      },
    );
  };
  useEffect(() => {
    setIsChange(false);
    dispatch(changeUploadImg(null));
    dispatch(
      changeEditForm({
        name: 'nickname',
        value: currentUser.nickname,
        reset: true,
      }),
    );
    dispatch(
      changeEditForm({name: 'height', value: currentUser.height, reset: true}),
    );
    dispatch(
      changeEditForm({
        name: 'shoeSize',
        value: currentUser.shoeSize,
        reset: true,
      }),
    );
    dispatch(
      changeEditForm({
        name: 'wingspan',
        value: currentUser.wingspan,
        reset: true,
      }),
    );
    dispatch(
      changeEditForm({name: 'intro', value: currentUser.intro, reset: true}),
    );
  }, [dispatch, currentUser]);

  function reset() {
    Alert.alert('프로필 수정', '초기화');

    dispatch(changeUploadImg(null));
    setIsChange(false);

    dispatch(
      changeEditForm({
        name: 'nickname',
        value: currentUser.nickname,
        reset: true,
      }),
    );
    dispatch(
      changeEditForm({name: 'height', value: currentUser.height, reset: true}),
    );
    dispatch(
      changeEditForm({
        name: 'shoeSize',
        value: currentUser.shoeSize,
        reset: true,
      }),
    );
    dispatch(
      changeEditForm({
        name: 'wingspan',
        value: currentUser.wingspan,
        reset: true,
      }),
    );
    dispatch(
      changeEditForm({name: 'intro', value: currentUser.intro, reset: true}),
    );
    setIsCheckNickname(true);
  }

  // 서브헤더 우측 완료버튼 이벤트
  function onSubmitEdit() {
    if (!isCheckNickname) {
      Alert.alert('프로필 수정', '닉네임을 확인해주세요.');
      return;
    }
    const match = /\.(\w+)$/.exec(imageUri?.assets[0]?.fileName ?? '');
    const type = match ? `image/${match[1]}` : 'image';
    const uri = imageUri?.assets[0]?.uri.replace(/\r?\n?/g, '').trim();

    let formData = new FormData();
    let isPhoto = false;
    if (imageUri) {
      isPhoto = true;
      const imgFile = {
        uri: uri,
        name: imageUri?.assets[0]?.fileName,
        type: type,
      };
      formData.append('file', imgFile);
    }

    const data = {
      nickname: editForm.nickname.value,
      intro: editForm.intro.value,
      height: editForm.height.value,
      shoeSize: editForm.shoeSize.value,
      wingspan: editForm.wingspan.value,
      image: currentUser.image,
    };

    if (isPhoto) {
      dispatch(saveImage(formData)).then(res => {
        dispatch(profileEdit({...data, image: res.payload}));
      });
    } else if (isChange) {
      dispatch(profileEdit({...data, image: ''}));
    } else {
      dispatch(profileEdit(data));
    }
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={selectProfile}>
            {currentUser?.image && !isChange ? (
              <UserAvatar source={{uri: currentUser.image}} size={100} />
            ) : isChange && imageUri ? (
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
              setIsChange(true);
              dispatch(changeUploadImg(null));
            }}>
            <Text style={styles.link}>프로필 사진 제거</Text>
          </TouchableOpacity>

          <View style={styles.nicknameBox}>
            <Text style={styles.nicknameLabel}>닉네임</Text>
            <View style={styles.nicknameInputBox}>
              <Input
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
              value={editForm.intro.value}
              onChangeText={value => updateInput('intro', value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputForm}>
            <Text style={styles.inputText}>키 (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder={'키를 입력해주세요.'}
              placeholderTextColor={'#ddd'}
              value={editForm.height.value.toString()}
              maxLength={3}
              type={editForm.height.type}
              onChangeText={value => updateInput('height', value)}
            />
          </View>
          <View style={styles.inputForm}>
            <Text style={styles.inputText}>신발 (mm)</Text>
            <TextInput
              style={styles.input}
              placeholder={'신발 사이즈를 입력해주세요.'}
              placeholderTextColor={'#ddd'}
              value={editForm.shoeSize?.value.toString()}
              maxLength={3}
              type={editForm.shoeSize.type}
              onChangeText={value => updateInput('shoeSize', value)}
            />
          </View>
          <View style={styles.inputForm}>
            <Text style={styles.inputText}>윙스팬 (cm)</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.wingspanInput}
                placeholder={'윙스팬을 입력해주세요.'}
                placeholderTextColor={'#ddd'}
                value={editForm.wingspan.value.toString()}
                maxLength={3}
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
                <Camera style={styles.cameraIcon} width={30} height={30} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.reset} onPress={reset}>
            <Text style={styles.link}>변경사항 초기화</Text>
          </TouchableOpacity>
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
    color: '#525050',
    justifyContent: 'center',
    width: '35%',
    marginTop: 30,
  },
  nicknameBox: {
    justifyContent: 'center',
    width: '80%',
  },
  nicknameLabel: {fontSize: 14, marginBottom: -20, color: 'black'},
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '60%',
  },
  nicknameInputBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },
  introBox: {width: '85%', marginTop: 20},
  introInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ADADAD',
    fontSize: 17,
    padding: 5,
    height: 74,
    color: 'black',
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
    fontSize: 12,
    marginBottom: 10,
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
    right: -10,
    top: -30,
  },
  introText: {
    fontSize: 12,
    marginBottom: 10,
    color: 'black',
  },
  reset: {
    marginTop: 20,
  },
  logout: {
    marginTop: 20,
    marginBottom: 100,
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
  input: {
    fontSize: 13,
    color: 'black',
    width: '65%',
    padding: 5,
    marginTop: 30,
  },
  wingspanInput: {
    fontSize: 13,
    color: 'black',
    width: '80%',
    padding: 5,
    marginTop: 30,
  },
});

export default ProfileEditScreen;
