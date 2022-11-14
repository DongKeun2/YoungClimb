import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import ReelsScreen from '../screens/reels/ReelsScreen';
import PostScreen from '../screens/homes/PostScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import DetailScreen from '../screens/profile/DetailScreen';
import FollowScreen from '../screens/profile/FollowScreen';

const Stack = createStackNavigator();

function ReelsStack({navigation, route}) {
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
      initialRouteName="릴스"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="릴스" component={ReelsScreen} />
      <Stack.Screen name="댓글" component={PostScreen} />
      <Stack.Screen name="게시글" component={DetailScreen} />
      <Stack.Screen name="서브프로필" component={ProfileScreen} />
      <Stack.Screen name="팔로우" component={FollowScreen} />
    </Stack.Navigator>
  );
}

export default ReelsStack;
