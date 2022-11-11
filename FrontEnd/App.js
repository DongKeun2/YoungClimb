import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {enableScreens} from 'react-native-screens';

import store from './utils/store';
import YoungClimb from './screens/YoungClimb';

import messaging from '@react-native-firebase/messaging';

import {getFcmToken} from './utils/fcm/fcmGetToken'

enableScreens();
export default function App() {

  // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //   //  여기에 로직을 작성한다.
  //   //  remoteMessage.data로 메세지에 접근가능
  //   //  remoteMessage.from 으로 topic name 또는 message identifier
  //   //  remoteMessage.messageId 는 메시지 고유값 id
  //   //  remoteMessage.notification 메시지와 함께 보내진 추가 데이터
  //   //  remoteMessage.sentTime 보낸시간
  //   });
  
  return (
    <Provider store={store}>
      <YoungClimb />
    </Provider>
  );
}
