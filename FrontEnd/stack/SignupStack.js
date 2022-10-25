import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SignupScreen from '../screens/accounts/SignupScreen';
import TermsScreen from '../screens/accounts/TermsScreen';
import WingSpanScreen from '../screens/accounts/WingspanScreen';

const Stack = createStackNavigator();

function SignupStack() {
  return (
    <Stack.Navigator
      initialRouteName="정보입력"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="정보입력" component={SignupScreen} />
      <Stack.Screen name="약관" component={TermsScreen} />
      <Stack.Screen name="윙스팬" component={WingSpanScreen} />
    </Stack.Navigator>
  );
}

export default SignupStack;
