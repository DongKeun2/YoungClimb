import React from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, View, Text, Image} from 'react-native';

import logo from '../../assets/image/main/wingspan.png';
import CustomButton from '../../components/CustomBtn';
import UploadImg from '../../components/UploadImg';
import {wingspan} from '../../utils/slices/AccountsSlice';

function WingSpanScreen({navigation}) {
  const dispatch = useDispatch();

  function onBeforePage() {
    navigation.goBack();
  }

  function onSubmitWingspan() {
    const data = {
      image: '',
      height: '',
    };
    dispatch(wingspan(data));
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
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
          width="30%"
          onPress={onBeforePage}
        />
        <CustomButton
          buttonColor="#EF3F8F"
          title="확인"
          width="30%"
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    marginTop: '5%',
    width: '100%',
    resizeMode: 'contain',
  },
  wingspanContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    width: 350,
    height: 350,
    borderColor: 'black',
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
  },
  content: {
    textAlign: 'center',
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  button: {
    width: '90%',
    height: '8%',
  },
});

export default WingSpanScreen;
