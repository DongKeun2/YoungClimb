import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="홈"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="홈" component={HomeScreen} />
      <Stack.Screen
        name="댓글"
        component={PostScreen}
        options={{tabBarVisible: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
