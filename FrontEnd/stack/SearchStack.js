import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SearchScreen from '../screens/SearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import FollowScreen from '../screens/profile/FollowScreen';

const Stack = createStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator
      initialRouteName="검색"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="검색" component={SearchScreen} />
      <Stack.Screen name="검색 결과" component={SearchResultScreen} />
      <Stack.Screen name="서브프로필" component={ProfileScreen} />
      <Stack.Screen name="팔로우" component={FollowScreen} />
    </Stack.Navigator>
  );
}

export default SearchStack;
