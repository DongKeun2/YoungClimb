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
import SignupStack from '../stack/SignupStack';

import StoreScreen from './StoreScreen';
import RandomScreen from './RandomScreen';
import ProfileScreen from './ProfileScreen';

import background from '../assets/image/initial/background.png';
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function YoungClimb() {
  const [loading, setIsLoading] = useState(true);
  const login = useSelector(state => state.accounts.loginState);

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
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'black',
                headerShown: false,
              }}>
              <Tab.Screen
                name="지점"
                component={StoreScreen}
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
                name="프로필"
                component={ProfileScreen}
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
