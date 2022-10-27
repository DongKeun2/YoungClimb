/* eslint-disable no-undef */
import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

import CustomButton from '../../components/CustomBtn';

function SuccessScreen({navigation}) {
  const dispatch = useDispatch();

  const [ImageUri, setImageUri] = useState(undefined);

  const onGallery = () => {
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
  };

  function SelectProfile() {
    onGallery();
    console.log('프로필 사진 변경');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입 성공</Text>
      <Text style={styles.text}>
        프로필을 꾸미고 회원님의 클라이밍을 뽐내보세요!
      </Text>
      <TouchableOpacity>
        <Image style={styles.circle} source={{uri: ImageUri?.assets[0]?.uri}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={SelectProfile}>
        <Text style={styles.link}>프로필 사진 선택</Text>
      </TouchableOpacity>
      <View style={styles.btnGroup}>
        <View style={styles.button}>
          <CustomButton
            titleColor="#7E7E7E"
            buttonColor="#F3F3F3"
            title="건너뛰기"
            onPress={() =>
              navigation.dispatch(CommonActions.navigate('로그인'))
            }
          />
        </View>
        <View style={styles.button}>
          <CustomButton
            buttonColor="#EF3F8F"
            title="완료"
            onPress={() => navigation.navigate('로그인')}
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
  circle: {
    width: 200,
    height: 200,
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
