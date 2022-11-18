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
        <View style={styles.pushNoticeBox}>
          <Text style={styles.pushNoticeTitle}>푸시 알림 허용</Text>
          <Switch
            trackColor={{false: 'gray', true: '#F34D7F'}}
            thumbColor={isNotice ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isNotice}
          />
        </View>
        <View style={styles.pushNoticeDescriptionBox}>
          <Text style={styles.pushNoticeDescription}>푸시 알림을 허용하면</Text>
          <Text style={styles.pushNoticeDescription}>
            팔로우, 댓글, 대댓글에 대한 알림을 받을 수 있습니다.
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', paddingVertical: 30},
  pushNoticeBox: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  pushNoticeTitle: {color: 'black', fontWeight: 'bold', fontSize: 20},
  pushNoticeDescriptionBox: {width: '80%'},
  pushNoticeDescription: {color: 'black', fontSize: 14},
});

export default AppSettings;
