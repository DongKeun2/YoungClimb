/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  SafeAreaView,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomSubHeader from '../../components/CustomSubHeader';

import {changeUploadVideo} from '../../utils/slices/PostSlice';

import gallery from '../../assets/image/main/whiteGallery.png';

function ChoiceVideoScreen({navigation}) {
  const dispatch = useDispatch();

  const uploadVideo = useSelector(state => state.post.uploadVideo);

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
      },
      res => {
        if (res.didCancel) {
          return;
        }
        console.log(res);
        dispatch(changeUploadVideo(res));
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
          <TouchableOpacity onPress={onVideoGallery} style={styles.cameraBtn}>
            <Text style={styles.btnText}>다시 선택하기</Text>
          </TouchableOpacity>
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
});

export default ChoiceVideoScreen;
