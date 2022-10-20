import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import StoreScreen from './screens/StoreScreen';
import RandomScreen from './screens/RandomScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="지점" component={StoreScreen} />
        <Tab.Screen name="릴스" component={RandomScreen} />
        <Tab.Screen name="홈" component={HomeScreen} />
        <Tab.Screen name="검색" component={SearchScreen} />
        <Tab.Screen name="프로필" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
