import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import HomeScreen from '../screens/homes/HomeScreen';
import PostScreen from '../screens/homes/PostScreen';
import NoticeScreen from '../screens/homes/NoticeScreen';
import ChoiceVideoScreen from '../screens/postadd/ChoiceVideoScreen';
import PostAddInfoScreen from '../screens/postadd/PostAddInfoScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import DetailScreen from '../screens/profile/DetailScreen';
import FollowScreen from '../screens/profile/FollowScreen';

const Stack = createStackNavigator();

function HomeStack({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === '댓글') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: undefined}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      initialRouteName="홈"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="홈" component={HomeScreen} />
      <Stack.Screen name="댓글" component={PostScreen} />
      <Stack.Screen name="알림" component={NoticeScreen} />
      <Stack.Screen name="게시글 생성" component={ChoiceVideoScreen} />
      <Stack.Screen name="정보 입력" component={PostAddInfoScreen} />
      <Stack.Screen name="게시글" component={DetailScreen} />
      <Stack.Screen name="서브프로필" component={ProfileScreen} />
      <Stack.Screen name="팔로우" component={FollowScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
