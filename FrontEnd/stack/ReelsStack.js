import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import ReelsScreen from '../screens/reels/ReelsScreen';
import PostScreen from '../screens/homes/PostScreen';

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
    </Stack.Navigator>
  );
}

export default ReelsStack;
