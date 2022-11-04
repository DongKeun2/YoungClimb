import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import ChoiceVideoScreen from '../screens/postadd/ChoiceVideoScreen';
import PostAddInfoScreen from '../screens/postadd/PostAddInfoScreen';

const Stack = createStackNavigator();

function PostAddStack({navigation, route}) {
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
      initialRouteName="영상 선택"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="영상 선택" component={ChoiceVideoScreen} />
      <Stack.Screen name="정보 입력" component={PostAddInfoScreen} />
    </Stack.Navigator>
  );
}

export default PostAddStack;
