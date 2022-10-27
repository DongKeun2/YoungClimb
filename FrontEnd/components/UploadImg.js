/* eslint-disable no-undef */ // for Platform.OS
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import {changeUploadImg} from '../utils/slices/AccountsSlice';

import wingspanExample from '../assets/image/main/wingspanExample.png';
import gallery from '../assets/image/main/whiteGallery.png';
import camera from '../assets/image/main/whiteCamera.png';

const imagePickerOption = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

function UploadImg() {
  const dispatch = useDispatch();

  const uploadImg = useSelector(state => state.accounts.uploadImg);

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
        console.log(res);
        dispatch(changeUploadImg(res));
      },
    );
  };

  const onCamera = () => {
    launchCamera(imagePickerOption).then(res => {
      if (res.didCancel || !res) {
        return;
      }
      dispatch(changeUploadImg(res));
    });
  };

  return (
    <>
      {uploadImg ? (
        <TouchableOpacity>
          <Image
            style={styles.circle}
            source={{uri: uploadImg?.assets[0]?.uri}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Image style={styles.circle} source={wingspanExample} />
        </TouchableOpacity>
      )}

      <View style={styles.btnGroup}>
        <TouchableOpacity onPress={onGallery} style={styles.cameraBtn}>
          <Image source={gallery} />
          <Text style={styles.btnText}>갤러리</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCamera} style={styles.cameraBtn}>
          <Image source={camera} />
          <Text style={styles.btnText}>카메라</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    backgroundColor: 'gray',
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  cameraBtn: {
    display: 'flex',
    flexDirection: 'row',
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
    width: '40%',
    height: 40,
    backgroundColor: '#EF3F8F',
  },
  btnText: {
    color: 'white',
  },
});

export default UploadImg;
