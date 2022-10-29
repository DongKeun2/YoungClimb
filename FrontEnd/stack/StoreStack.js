import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';

import StoreScreen from '../screens/stores/StoreScreen'
import StoreDetail from '../screens/stores/StoreDetail'
import Store3DWall from '../screens/stores/Store3DWall'

const Stack = createStackNavigator();

export default function StoreStack() {
  return(
		<Stack.Navigator
		initialRouteName="지점메인"
		screenOptions={{headerShown: false}}>
			<Stack.Screen name="지점메인" component={StoreScreen} />
			<Stack.Screen name="지점상세" component={StoreDetail} />
			<Stack.Screen name="3D벽" component={Store3DWall} />
		</Stack.Navigator>


	)

}