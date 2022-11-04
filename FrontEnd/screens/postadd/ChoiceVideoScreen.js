/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */ // for Platform.OS
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomSubHeader from '../../components/CustomSubHeader';

import {
  changeUploadVideo,
  changeUploadVideoUri,
} from '../../utils/slices/PostSlice';

import gallery from '../../assets/image/main/whiteGallery.png';

function ChoiceVideoScreen({navigation}) {
  const dispatch = useDispatch();

  const uploadVideo = useSelector(state => state.post.uploadVideo);
  const uploadVideoUri = useSelector(state => state.post.uploadVideoUri);

  useEffect(() => {
    dispatch(changeUploadVideo(null));
    dispatch(changeUploadVideoUri(null));
  }, []);

  const onVideoGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'video',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          return;
        }
        let uri = 'file://' + res.assets[0].uri.substring(9);
        dispatch(changeUploadVideo(res));
        dispatch(changeUploadVideoUri(uri));
      },
    );
  };

  return (
    <View>
      <CustomSubHeader
        title="영상 선택"
        rightTitle="다음"
        navigation={navigation}
        isVideo={true}
      />
      {uploadVideo && uploadVideoUri ? (
        <>
          <View style={styles.videoBox}>
            <Video
              source={{uri: uploadVideoUri}}
              style={styles.backgroundVideo}
              fullscreen={false}
              resizeMode={'contain'}
              repeat={false}
              controls={false}
              muted={true}
              paused={true}
            />
          </View>
          <Text style={{color: 'black', fontSize: 50}}>재생중</Text>
        </>
      ) : (
        // <TouchableOpacity>
        //   <Image
        //     style={styles.image}
        //     source={{uri: uploadImg?.assets[0]?.uri}}
        //   />
        // </TouchableOpacity>
        // <TouchableOpacity>
        //   <Image style={styles.image} source={wingspanExample} />
        // </TouchableOpacity>
        <Text style={{color: 'black', fontSize: 50}}>업로드 해줘</Text>
      )}
      <TouchableOpacity onPress={onVideoGallery} style={styles.cameraBtn}>
        <Image source={gallery} />
        <Text style={styles.btnText}>갤러리</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  videoBox: {
    width: 300,
    height: 300,
    flex: 1,
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

export default ChoiceVideoScreen;
