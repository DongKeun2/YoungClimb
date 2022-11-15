/* eslint-disable no-undef */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

import {
  profileCreate,
  fetchCurrentUser,
  saveImage,
} from '../../utils/slices/AccountsSlice';
import CustomButton from '../../components/CustomBtn';
import UserAvatar from '../../components/UserAvatar';

import {getCurrentUser} from '../../utils/Token';

const windowHeight = Dimensions.get('window').height;

function SuccessScreen({navigation}) {
  const dispatch = useDispatch();

  const [imageUri, setImageUri] = useState(undefined);
  const [intro, setIntro] = useState('');
  const currentUser = useSelector(state => state.accounts.currentUser);

  const SelectProfile = () => {
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
        setImageUri(res);
      },
    );
  };

  function onSubmitProfile(isSkip) {
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
      intro: intro,
      image: '',
    };

    if (!isSkip) {
      if (isPhoto) {
        dispatch(saveImage(formData)).then(res => {
          dispatch(profileCreate({...data, image: res.payload})).then(res => {
            // 스토어에 회원정보 입력 후 로그인 처리
            getCurrentUser().then(
              currentUser => dispatch(fetchCurrentUser(currentUser)),
              Alert.alert('', '회원가입에 성공했습니다.'),
            );
          });
        });
      } else {
        dispatch(profileCreate(data)).then(res => {
          // 스토어에 회원정보 입력 후 로그인 처리
          getCurrentUser().then(
            currentUser => dispatch(fetchCurrentUser(currentUser)),
            Alert.alert('', '회원가입에 성공했습니다.'),
          );
        });
      }
    } else {
      getCurrentUser().then(currentUser =>
        dispatch(fetchCurrentUser(currentUser)),
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>회원가입 성공!</Text>
        <Text style={styles.text}>
          프로필을 꾸미고 회원님의 클라이밍을 뽐내보세요!
        </Text>
      </View>
      <View style={styles.InputBox}>
        {imageUri ? (
          <UserAvatar source={{uri: imageUri?.assets[0]?.uri}} size={100} />
        ) : (
          <TouchableOpacity onPress={SelectProfile}>
            <UserAvatar
              source={{
                uri: 'https://youngclimb.s3.ap-northeast-2.amazonaws.com/userProfile/KakaoTalk_20221108_150615819.png',
              }}
              size={100}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={SelectProfile}>
          <Text style={styles.link}>프로필 사진 선택</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setImageUri(undefined);
          }}>
          <Text style={styles.link}>프로필 사진 제거</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="소개를 작성해주세요 :)"
          placeholderTextColor={'#ddd'}
          multiline={true}
          textAlignVertical="top"
          onChangeText={value => setIntro(value)}
        />
      </View>
      <View style={styles.btnGroup}>
        <View style={styles.button}>
          <CustomButton
            titleColor="#7E7E7E"
            buttonColor="#F3F3F3"
            title="건너뛰기"
            onPress={() => onSubmitProfile(true)}
          />
        </View>
        <View style={styles.button}>
          <CustomButton
            buttonColor="#F34D7F"
            title="완료"
            onPress={() => onSubmitProfile(false)}
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
    marginTop: windowHeight / 6,
    alignItems: 'center',
    width: '100%',
    height: '10%',
  },
  title: {
    fontSize: 20,
    color: '#F34D7F',
  },
  InputBox: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 30,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ADADAD',
    fontSize: 17,
    padding: 7,
    marginVertical: '10%',
    borderRadius: 5,
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
    margin: 10,
    color: 'black',
  },
  link: {
    color: '#F34D7F',
  },
});

export default SuccessScreen;
