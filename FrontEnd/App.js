import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

import StoreScreen from './screens/StoreScreen';
import RandomScreen from './screens/RandomScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  // 임시 로그인 상태
  const [login, setLogin] = useState(false);
  const [initialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 3000);
  }, []);

  return (
    // {initialLoading?
    // <Screen name="초기화면" component={}/>
    // }
    <NavigationContainer>
      {login ? (
        <Tab.Navigator initialRouteName="홈">
          <Tab.Screen name="지점" component={StoreScreen} />
          <Tab.Screen name="릴스" component={RandomScreen} />
          <Tab.Screen name="홈" component={HomeScreen} />
          <Tab.Screen name="검색" component={SearchScreen} />
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
  );
}
