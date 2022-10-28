import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';
import FollowScreen from '../screens/profile/FollowScreen';
import DetailScreen from '../screens/profile/DetailScreen';
import CommentScreen from '../screens/profile/CommentScreen';

import PostAddStack from './PostAddStack';

const Stack = createStackNavigator();

function ProfileStack({navigation, route}) {
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
      initialRouteName="프로필"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="프로필" component={ProfileScreen} />
      <Stack.Screen name="게시글 생성" component={PostAddStack} />
      <Stack.Screen name="프로필 설정" component={ProfileEditScreen} />
      <Stack.Screen name="팔로우" component={FollowScreen} />
      <Stack.Screen name="게시글" component={DetailScreen} />
      <Stack.Screen name="댓글" component={CommentScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
