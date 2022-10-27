import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View, Text, Image} from 'react-native';

import logo from '../../assets/image/main/wingspan.png';
import CustomButton from '../../components/CustomBtn';
import UploadImg from '../../components/UploadImg';
import {wingspan} from '../../utils/slices/AccountsSlice';

import test from '../../assets/image/main/wingspan.png';

function WingSpanScreen({navigation}) {
  const dispatch = useDispatch();

  const imageUri = useSelector(
    state => state.accounts.uploadImg?.assets[0].uri,
  );
  const imageName = useSelector(
    state => state.accounts.uploadImg?.assets[0].fileName,
  );

  const height = useSelector(state => state.accounts.signupForm.height.value);

  function onBeforePage() {
    navigation.goBack();
  }

  function onSubmitWingspan() {
    console.log('버튼 눌림');
    const match = /\.(\w+)$/.exec(imageName ?? '');
    const type = match ? `image/${match[1]}` : 'image';
    console.log(test);
    console.log(imageUri);
    const formdata = new FormData();
    formdata.append('image', {
      uri: imageUri,
      name: imageName,
      type,
    });
    const data = {
      height,
    };
    formdata.append('data', JSON.stringify(data));
    // formdata.append('height', `${height}`);
    // formdata.append('enctype', 'multipart/form-data');
    // const data = {
    //   image: formdata,
    //   height,
    // };
    // console.log(data);
    // console.log(formdata._parts[0][1]);
    // console.log(formdata);
    dispatch(wingspan(formdata));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.wingspanContainer}>
        <Text style={styles.title}>윙스팬 측정</Text>
        <Text style={styles.content}>
          보다 정확한 측정을 위해{'\n'}
          아래 사진과 같이 정면에서 촬영해주세요.
        </Text>
        <UploadImg />
      </View>
      <View style={styles.btnGroup}>
        <CustomButton
          buttonColor="#F3F3F3"
          title="취소"
          titleColor="#7E7E7E"
          width="40%"
          onPress={onBeforePage}
        />
        <CustomButton
          buttonColor="#F34D7F"
          title="확인"
          width="40%"
          onPress={onSubmitWingspan}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '15%',
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
  },
  wingspanContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 350,
    height: 350,
    borderColor: 'black',
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    padding: 10,
  },
  content: {
    textAlign: 'center',
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
});

export default WingSpanScreen;
