import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SignupScreen from '../screens/accounts/SignupScreen';
import TermsScreen from '../screens/accounts/TermsScreen';
import WingSpanScreen from '../screens/accounts/WingspanScreen';

const Stack = createStackNavigator();

function SignupStack() {
  return (
    <Stack.Navigator
      initialRouteName="회원가입페이지"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="회원가입페이지" component={SignupScreen} />
      <Stack.Screen name="약관" component={TermsScreen} />
      <Stack.Screen name="윙스팬" component={WingSpanScreen} />
    </Stack.Navigator>
  );
}

export default SignupStack;
