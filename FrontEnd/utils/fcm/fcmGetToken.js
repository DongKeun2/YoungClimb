import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import axios from 'axios';
import getConfig from '../headers';
// export const getFcmToken = async () => {
//   const fcmToken = await messaging().getToken();
//   console.log('디바이스 토큰값');
//   console.log(fcmToken);
//   // dispatch(set_deviceToken(fcmToken));
//   return fcmToken
// };

export const getFcmToken = async () => {
  try{
    let fcmToken
    const authStatus = await messaging().requestPermission();
    const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
    fcmToken = await messaging().getToken();
  }
  console.log('tokken',fcmToken)
    return fcmToken

  } catch{}
}


export const handleInitialFCM = async()=>{
  try{
    await AsyncStorage.setItem('getPush', JSON.stringify('granted'))
    const fcmToken = await getFcmToken()
    await AsyncStorage.setItem('fcmToken', JSON.stringify(fcmToken))
  }catch{}
}


export const onRefreshFCMToken = async()=> {
  const refreshedFCMToken = messaging().onTokenRefresh(
    async()=>{
      try{
        const fcmToken = await messaging().getToken()
        const res = await axios.post(api.fcmtokensave,{fcmToken}, await getConfig())
        console.log(res)
        return}
      catch{err=>console.log(err)}
    })
  
  await AsyncStorage.setItem('fcmToken', JSON.stringify(refreshedFCMToken))
}