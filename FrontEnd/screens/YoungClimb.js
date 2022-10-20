import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import InitialScreen from './InitialScreen';

import MainScreen from './MainScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

import SearchStack from '../stack/SearchStack';

import StoreScreen from './StoreScreen';
import RandomScreen from './RandomScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function YoungClimb() {
  const [loading, setIsLoading] = useState(true);
  const login = useSelector(state => state.accounts.loginState);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  return (
    <>
      {loading ? (
        <InitialScreen />
      ) : (
        <NavigationContainer>
          {login ? (
            <Tab.Navigator initialRouteName="홈">
              <Tab.Screen name="지점" component={StoreScreen} />
              <Tab.Screen name="릴스" component={RandomScreen} />
              <Tab.Screen name="홈" component={HomeScreen} />
              <Tab.Screen
                name="검색"
                component={SearchStack}
                options={{headerShown: false}}
              />
              <Tab.Screen name="프로필" component={ProfileScreen} />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator initialRouteName="메인">
              <Stack.Screen name="메인" component={MainScreen} />
              <Stack.Screen name="로그인" component={LoginScreen} />
              <Stack.Screen name="회원가입" component={SignupScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </>
  );
}
