import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

import logo from '../../assets/image/main/wingspan.png';
import CustomButton from '../../components/CustomBtn';
import UploadImg from '../../components/UploadImg';

import {
  wingspan,
  changeSignupForm,
  changeEditForm,
} from '../../utils/slices/AccountsSlice';

function WingSpanScreen({navigation, route}) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const imageUri = useSelector(
    state => state.accounts.uploadImg?.assets[0].uri,
  );
  const imageName = useSelector(
    state => state.accounts.uploadImg?.assets[0].fileName,
  );

  const height = route.params.height;

  function onBeforePage() {
    navigation.goBack();
  }

  function onSubmitWingspan() {
    setIsLoading(true);
    const match = /\.(\w+)$/.exec(imageName ?? '');
    const type = match ? `image/${match[1]}` : 'image';
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

    dispatch(wingspan(formdata)).then(res => {
      if (res.type === 'wingspan/rejected') {
        setIsLoading(false);
        Alert.alert('측정 실패', '올바른 사진을 업로드해주세요.');
      } else {
        if (route.params.type === 'signup') {
          dispatch(
            changeSignupForm({
              name: 'wingspan',
              value: String(res.payload.wingspan.toFixed(0)),
            }),
          );
        } else if (route.params.type === 'edit') {
          dispatch(
            changeEditForm({
              name: 'wingspan',
              value: String(res.payload.wingspan.toFixed(0)),
            }),
          );
        }
        setIsLoading(false);
        onBeforePage();
      }
    });
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
          buttonColor="#EF3F8F"
          title="확인"
          width="40%"
          onPress={onSubmitWingspan}
        />
      </View>
      {isLoading ? (
        <View style={styles.loadingBackGround}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 400,
    borderColor: 'black',
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    padding: 10,
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 10,
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  loadingBackGround: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});

export default WingSpanScreen;
