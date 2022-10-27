import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import HomeScreen from '../screens/homes/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

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
    </Stack.Navigator>
  );
}

export default ProfileStack;
