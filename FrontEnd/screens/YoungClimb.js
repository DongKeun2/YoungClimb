import 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import React, {useRef, useState, useEffect, useCallback} from 'react';
import { Platform, PermissionsAndroid, Linking, Alert } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import InitialScreen from './InitialScreen';

import MainScreen from './MainScreen';
import LoginScreen from './accounts/LoginScreen';
import SignupStack from '../stack/SignupStack';

import HomeStack from '../stack/HomeStack';
import SearchStack from '../stack/SearchStack';

import StoreStack from '../stack/StoreStack';
import RandomScreen from './RandomScreen';
import ProfileStack from '../stack/ProfileStack';

import MapIcon from '../assets/image/tab/map.svg';
import ReelsIcon from '../assets/image/tab/reels.svg';
import HomeIcon from '../assets/image/tab/home.svg';
import SearchIcon from '../assets/image/tab/search.svg';
import ProfileIcon from '../assets/image/tab/profile.svg';
import ActiveMapIcon from '../assets/image/tab/activeMap.svg';
import ActiveReelsIcon from '../assets/image/tab/activeReels.svg';
import ActiveHomeIcon from '../assets/image/tab/activeHome.svg';
import ActiveSearchIcon from '../assets/image/tab/activeSearch.svg';
import ActiveProfileIcon from '../assets/image/tab/activeProfile.svg';

import {
  getCurrentUser,
  removeAccessToken,
  removeCurrentUser,
} from '../utils/Token';
import {fetchCurrentUser} from '../utils/slices/AccountsSlice';
import {fetchCenterInfo} from '../utils/slices/CenterSlice';
import {StartPer, AsyncAlert, checkMultiplePermissions} from '../utils/permissions.js'

import { handleInitialFCM, onRefreshFCMToken } from '../utils/fcm/fcmGetToken';
import { changeNewNoti } from '../utils/slices/notificationSlice';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function YoungClimb() {
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(true);

  const login = useSelector(state => state.accounts.loginState);
  useEffect(()=>{
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      await AsyncStorage.setItem('newNoti','true')
      dispatch(changeNewNoti(true))

    });

    messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      await AsyncStorage.setItem('newNoti','true')
      dispatch(changeNewNoti(true))
    })

  },[])

  useEffect(() => {
    const permissionList = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      // PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
     ]
    const permissionDict = {
      'android.permission.CAMERA': '카메라',
      'android.permission.ACCESS_FINE_LOCATION': '위치',
      'android.permission.READ_EXTERNAL_STORAGE': '저장공간',
    }
    const neverCallList = []
    const callRes = async()=> {
      try{
        const result = await checkMultiplePermissions(permissionList)
        if (!login && !result) {
            await AsyncAlert('Young Climb 앱 권한 설정', '원활한 Young Climb 앱 사용을 위해 다음의 권한을 허용해주세요', 
            async ()=> { 
              try{
              for (const per of permissionList) {
                const result = await StartPer(per)
                if (result === per) {
                  neverCallList.push(per)
                }
              }
            } catch(err){console.log(err)}
          })
          }
        if (neverCallList.length){
          let txt = '' 
          neverCallList.forEach((content)=>{
            txt += permissionDict[content] + `\n`
          }) 
          AsyncAlert('권한 요청 거부된 요청','다음의 권한 요청이 거부되어 설정에서 권한 설정 후 앱 사용바랍니다. \n \n'+txt,Linking.openSettings)
        }
      } catch (err){console.log(err)}
    }
    callRes()
    
    if(!login){
      // 로그인 되어있지 않은 상태면 fcmToken 받아와서 async에 저장
      handleInitialFCM()
    } else{
      onRefreshFCMToken()
    }

},[]);

  useEffect(() => {
    console.log('앱 새로고침');
    dispatch(fetchCenterInfo());

    getCurrentUser().then(res => {
      if (res) {
        console.log('로그인됨', res);
        dispatch(fetchCurrentUser(res));
      } else {
        console.log('비로그인상태임');
        removeAccessToken();
        removeCurrentUser();
      }
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <InitialScreen />
      ) : (
        <NavigationContainer>
          {login ? (
            <Tab.Navigator
              initialRouteName="홈탭"
              screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'black',
                headerShown: false,
              }}>
              <Tab.Screen
                name="지점"
                component={StoreStack}
                options={{
                  tabBarIcon: ({focused}) =>
                    focused ? <ActiveMapIcon /> : <MapIcon />,
                }}
              />
              <Tab.Screen
                name="릴스"
                component={RandomScreen}
                options={{
                  tabBarIcon: ({focused}) =>
                    focused ? <ActiveReelsIcon /> : <ReelsIcon />,
                }}
              />
              <Tab.Screen
                name="홈탭"
                component={HomeStack}
                options={{
                  tabBarIcon: ({focused}) =>
                    focused ? <ActiveHomeIcon /> : <HomeIcon />,
                }}
              />
              <Tab.Screen
                name="검색탭"
                component={SearchStack}
                options={{
                  tabBarIcon: ({focused}) =>
                    focused ? <ActiveSearchIcon /> : <SearchIcon />,
                }}
              />
              <Tab.Screen
                name="프로필탭"
                component={ProfileStack}
                options={{
                  tabBarIcon: ({focused}) =>
                    focused ? <ActiveProfileIcon /> : <ProfileIcon />,
                }}
              />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator
              initialRouteName="메인"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="메인" component={MainScreen} />
              <Stack.Screen name="로그인" component={LoginScreen} />
              <Stack.Screen name="회원가입" component={SignupStack} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </>
  );
}
