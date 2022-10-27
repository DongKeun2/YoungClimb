import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';

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
    </Stack.Navigator>
  );
}

export default HomeStack;
