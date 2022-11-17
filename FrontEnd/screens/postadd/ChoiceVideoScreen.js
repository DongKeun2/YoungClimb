/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  SafeAreaView,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import Video from 'react-native-video';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomSubHeader from '../../components/CustomSubHeader';

import {changeUploadVideo} from '../../utils/slices/PostSlice';

import gallery from '../../assets/image/main/whiteGallery.png';
import { AsyncAlert, checkPermission, requestSinglePermission } from '../../utils/permissions';

function ChoiceVideoScreen({navigation}) {
  const dispatch = useDispatch();
  const [permissionTrial, setPermissionTrial] = useState(1)

  const uploadVideo = useSelector(state => state.post.uploadVideo);

  useEffect(()=>{
    checkPermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((res)=>{
      const granted = res
      console.log(res)
      if (!granted&&permissionTrial===1){
        const message = {title:'권한 거부된 요청 (저장공간)', content:'서비스 이용을 위한 권한 요청이 거부되어 설정에서 권한 설정 후 앱 사용바랍니다.'}
        requestSinglePermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,message).then(
          setPermissionTrial(2)
        ) 
      } else if (!granted){
          navigation.goBack()
      } else if (granted === 'never'){
        AsyncAlert(
          '권한 요청 거부된 요청',
          '서비스 이용을 위한 권한 요청이 거부되어 설정에서 권한 설정 후 앱 사용바랍니다.',
          Linking.openSettings,
        );
      }
    })
  },[permissionTrial])

  useEffect(() => {
    dispatch(changeUploadVideo(null));
  }, []);

  const onVideoGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'video',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: false,
        videoQuality: 'low',
        includeExtra: true,
      },
      res => {
        if (res.didCancel) {
          return;
        }
        if (res.assets[0].fileSize > 45000000) {
          alert('파일 크기가 너무 큽니다. 다른 영상을 선택해주세요.');
          return;
        } else {
          dispatch(changeUploadVideo(res));
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomSubHeader
        title="영상 선택"
        rightTitle="다음"
        navigation={navigation}
        isVideo={true}
      />
      {uploadVideo ? (
        <>
          <TouchableOpacity
            onPress={onVideoGallery}
            style={styles.videoBox}
            activeOpacity={1}>
            <Video
              source={{uri: uploadVideo.assets[0].uri}}
              style={styles.backgroundVideo}
              fullscreen={false}
              resizeMode={'contain'}
              repeat={false}
              controls={false}
              muted={true}
              paused={false}
            />
          </TouchableOpacity>
          <View style={styles.metaBox}>
            <Text style={styles.metaHeader}>업로드한 동영상 정보</Text>
            <View style={styles.metaInfoBox}>
              <Text style={styles.btnText}>
                Time :{' '}
                {uploadVideo.assets[0].timestamp.substring(0, 3) === '202'
                  ? uploadVideo.assets[0].timestamp.substring(0, 10)
                  : '오래 전'}
              </Text>
              <Text style={styles.btnText}>
                Type : {uploadVideo.assets[0].type}
              </Text>
              <Text style={styles.btnText}>
                Duration : {uploadVideo.assets[0].duration} 초
              </Text>
              <Text style={styles.btnText}>
                Size : {uploadVideo.assets[0].width} X{' '}
                {uploadVideo.assets[0].height}
              </Text>
            </View>
            <TouchableOpacity onPress={onVideoGallery} style={styles.cameraBtn}>
              <Text style={styles.btnText}>다시 선택하기</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <TouchableOpacity
          onPress={onVideoGallery}
          style={styles.blackBox}
          activeOpacity={1}>
          <Text style={styles.text}>업로드할 동영상을 선택해주세요</Text>
          <View style={styles.flexBox}>
            <Image source={gallery} />
            <Text style={{...styles.btnText, marginLeft: 5, marginBottom: 2}}>
              갤러리
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  blackBox: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoBox: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  cameraBtn: {
    display: 'flex',
    flexDirection: 'row',
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    backgroundColor: '#EF3F8F',
    margin: 5,
    marginVertical: 15,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 24,
    color: 'white',
    marginBottom: 2,
  },
  btnText: {
    color: 'white',
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
  },
  metaBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  metaHeader: {
    color: 'white',
    fontSize: 18,
    marginVertical: 30,
  },
  metaInfoBox: {
    marginBottom: 30,
  },
});

export default ChoiceVideoScreen;
