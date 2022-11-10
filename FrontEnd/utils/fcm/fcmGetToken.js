import messaging from '@react-native-firebase/messaging';

export const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  console.log('디바이스 토큰값');
  console.log(fcmToken);
  // dispatch(set_deviceToken(fcmToken));
  return fcmToken
};