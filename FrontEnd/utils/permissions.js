import {
  check,
  request,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';
import { BackHandler, PermissionsAndroid, Alert, Linking} from 'react-native';
import { Platform } from 'react-native';

export const StartPer = async (per)=>{
  if (Platform === 'ios'){
    return
  }
  let neverask = false
  const granted = await PermissionsAndroid.check(per)
  if (granted === false) {
    await PermissionsAndroid.request(per).then(async(res)=>{
      switch (res){
        case PermissionsAndroid.RESULTS.GRANTED:
          break
        case PermissionsAndroid.RESULTS.DENIED:
          break
        case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
          neverask=true
          break
      }}
          )
  } else {
    return true
  }
  if (neverask){
    return per
  }

}

export const AsyncAlert = (title, msg, onPressF) => new Promise(async(resolve) => {
  Alert.alert(
    title,
    msg,
    [
      {
        text: 'ok',
        onPress: async () => {
          await onPressF()
          resolve()
        },
      },
    ],
    { cancelable: false },
  );
});
// This function can be used anywhere as it supports multiple permissions. 
// It checks for permissions and then requests for it.
export const checkMultiplePermissions = async(permissions)=> {
  try{
    let isPermissionGranted = false;
    for (const index in permissions) {
      // console.log(permissions[index])
      await PermissionsAndroid.check(permissions[index]).then((res)=>{
        // console.log(res,'res')
        if (res ===true) {
          isPermissionGranted =true
        } else{
          isPermissionGranted = false
        }
      }).catch((err)=>console.log(err))
    }
    return isPermissionGranted;
  } catch(err){console.log(err)}
}

// In case you want to check a single permission
export async function checkPermission(permission) {
  var isPermissionGranted = false;
  const result = await check(permission);
  switch (result) {
    case RESULTS.NEVER_ASK_AGAIN:
      isPermissionGranted = 'never';
      break;
    case RESULTS.GRANTED:
      isPermissionGranted = true;
      break;
    case RESULTS.DENIED:
      isPermissionGranted = false;
      break;
  }
  return isPermissionGranted;
}

export async function requestSinglePermission(permission,message) {
  try{
    const granted = await PermissionsAndroid.request(permission);
    // console.log(granted)
    if (granted === RESULTS.GRANTED){
      return true
    } 
    else if (granted === RESULTS.DENIED) {
      return false
    } else {
      Alert.alert(
        message.title||'앱 사용에 권장되는 권한입니다.',
        message.content||'앱 설정에 들어가 권한을 설정해주세요',
        [
            {
                text: 'OK',
                onPress: async() => {
                   await Linking.openSettings()
                },
            },
        ],
    )
    return false
    }
  } catch(err){
    console.warn(err)
  }
}


export async function requestPermission() {

  try {
   const granted = await PermissionsAndroid.requestMultiple(
    [
     PermissionsAndroid.PERMISSIONS.CAMERA,
     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
     PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ],
    {
      buttonNeutral: "Ask Me Later",
      buttonNegative:"Cancel",
      buttonPositive: "OK"
    },
   )

   if (granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' && granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
    console.log('Permission accepted')
   } else {
    console.log('Read storage permission denied')
   }
  } catch (err) {
   console.warn(err)
  }
 }