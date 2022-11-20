import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import axios from 'axios';
import getConfig from '../headers';


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
    const fcmToken = await getFcmToken()
    await AsyncStorage.setItem('fcmToken', JSON.stringify(fcmToken))
    await AsyncStorage.setItem('followNoti','true')
    await AsyncStorage.setItem('likeNoti','true')
    await AsyncStorage.setItem('commentNoti','true')
    await AsyncStorage.setItem('commentLikeNoti','true')
    await AsyncStorage.setItem('subCommentNoti','true')
  }catch{}
}


export const onRefreshFCMToken = async()=> {
  const refreshedFCMToken = messaging().onTokenRefresh(
    async()=>{
      try{
        const isPushGranted = await AsyncStorage.getItem('notiAllow')
        if(isPushGranted){
          const fcmToken = await messaging().getToken()
          const res = await axios.post(api.fcmtokensave,{fcmToken}, await getConfig())
          await AsyncStorage.setItem('fcmToken', JSON.stringify(refreshedFCMToken))
        }
        return}
      catch{err=>console.log(err)}
    })
  
}