/* eslint-disable no-undef */ // for Platform.OS
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Image, StyleSheet, TouchableOpacity, PermissionsAndroid} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import {changeUploadImg} from '../utils/slices/AccountsSlice';

import wingspanExample from '../assets/image/main/wingspanExample.png';
import gallery from '../assets/image/main/whiteGallery.png';
import camera from '../assets/image/main/whiteCamera.png';
import { checkPermission, requestSinglePermission } from '../utils/permissions';

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
    checkPermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((res)=>{
      const granted = res
      console.log(res)
      if (!granted){
        const message = {title:'권한 거부된 요청 (저장공간)', content:'서비스 이용을 위한 권한 요청이 거부되어 설정에서 권한 설정 후 앱 사용바랍니다.'}
        requestSinglePermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,message)
      } else {
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
      }
    })
  };

  const onCamera = () => {
    checkPermission(PermissionsAndroid.PERMISSIONS.CAMERA).then((res)=>{
      const granted = res
      console.log(res)
      if (!granted){
        const message = {title:'권한 거부된 요청 (카메라)', content:'서비스 이용을 위한 권한 요청이 거부되어 설정에서 권한 설정 후 앱 사용바랍니다.'}
        requestSinglePermission(PermissionsAndroid.PERMISSIONS.CAMERA,message)
      } else {
        launchCamera(imagePickerOption).then(res => {
          if (res.didCancel || !res) {
            return;
          }
          dispatch(changeUploadImg(res));
        });
      }
    })


  };

  return (
    <>
      {uploadImg ? (
        <TouchableOpacity>
          <Image
            style={styles.image}
            source={{uri: uploadImg?.assets[0]?.uri}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Image style={styles.image} source={wingspanExample} />
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
  image: {
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
    borderRadius: 10,
    width: '40%',
    height: 40,
    backgroundColor: '#EF3F8F',
    margin: 5,
    marginVertical: 15,
  },
  btnText: {
    color: 'white',
  },
});

export default UploadImg;
