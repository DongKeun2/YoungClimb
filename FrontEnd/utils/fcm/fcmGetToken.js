import messaging from '@react-native-firebase/messaging';


// export const getFcmToken = async () => {
//   const fcmToken = await messaging().getToken();
//   console.log('디바이스 토큰값');
//   console.log(fcmToken);
//   // dispatch(set_deviceToken(fcmToken));
//   return fcmToken
// };

export const getFcmToken = async () => {
  let fcmToken
  const authStatus = await messaging().requestPermission();
  const enabled =
  authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
  fcmToken = await messaging().getToken();
}
  return fcmToken
}

export const onRefreshFCMToken = async()=> {
  const refreshedFCMToken = messaging().onTokenRefresh()
}