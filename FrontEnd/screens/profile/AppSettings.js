import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Switch} from 'react-native';
import {useDispatch} from 'react-redux';
import CustomSubHeader from '../../components/CustomSubHeader';
import {getFcmToken} from '../../utils/fcm/fcmGetToken';
import {fcmRemove, fcmSave} from '../../utils/slices/AccountsSlice';
import {fetchIsNotice} from '../../utils/slices/ProfileSlice';

function AppSettings({navigation}) {
  const dispatch = useDispatch();
  const [isNotice, setIsNotice] = useState(false);

  function toggleSwitch() {
    if (isNotice) {
      dispatch(fcmRemove());
    } else {
      console.log('켬');
      getFcmToken().then(res => {
        const data = {
          fcmToken: res,
        };
        dispatch(fcmSave(data));
      });
    }

    setIsNotice(previousState => !previousState);
  }
  useEffect(() => {
    dispatch(fetchIsNotice()).then(res => {
      setIsNotice(res.payload);
    });
  }, [dispatch]);

  return (
    <>
      <CustomSubHeader title={'앱 설정'} navigation={navigation} />
      <View style={styles.container}>
        <Text>알림 설정</Text>
        <Switch
          trackColor={{false: 'gray', true: '#F34D7F'}}
          thumbColor={isNotice ? 'white' : 'white'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isNotice}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default AppSettings;
