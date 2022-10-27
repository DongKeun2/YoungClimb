import 'react-native-gesture-handler';

import React, {useRef, useState, useEffect} from 'react';
import {Image, Animated, View} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import InitialScreen from './InitialScreen';

import MainScreen from './MainScreen';
import LoginScreen from './accounts/LoginScreen';
import SignupScreen from './accounts/SignupScreen';

import HomeStack from '../stack/HomeStack';
import SearchStack from '../stack/SearchStack';

import StoreScreen from './StoreScreen';
import RandomScreen from './RandomScreen';
import ProfileScreen from './ProfileScreen';

import background from '../assets/image/initial/background.png';
import SignupStack from '../stack/SignupStack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function YoungClimb() {
  const [loading, setIsLoading] = useState(true);
  // const login = useSelector(state => state.accounts.loginState);
  const login = true

  // const fadeAnim = useRef(new Animated.Value(1)).current;

  // const fadeIn = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const fadeOut = async () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  //   return true;
  // };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  });

  // useEffect(() => {
  //   // fadeIn();
  //   setTimeout(() => {
  //     fadeOut().then(() => {
  //       setIsLoading(false);
  //     });
  //   }, 2500);
  // });

  return (
    <>
      {loading ? (
        <InitialScreen />
      ) : (
        // <Animated.View
        //   style={{
        //     opacity: fadeAnim,
        //   }}>
        //   <ImageBackground
        //     source={background}
        //     style={{width: '100%', height: '100%'}}
        //   />
        // </Animated.View>
        <NavigationContainer>
          {login ? (
            <Tab.Navigator
              initialRouteName="홈탭"
              screenOptions={{
                headerShown: false,
              }}>
              <Tab.Screen name="지점" component={StoreScreen} />
              <Tab.Screen name="릴스" component={RandomScreen} />
              <Tab.Screen name="홈탭" component={HomeStack} />
              <Tab.Screen name="검색탭" component={SearchStack} />
              <Tab.Screen name="프로필" component={ProfileScreen} />
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
