import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SignupScreen from '../screens/accounts/SignupScreen';
import SignupScreen2 from '../screens/accounts/SignupScreen2';
import TermsScreen from '../screens/accounts/TermsScreen';
import WingspanScreen from '../screens/accounts/WingspanScreen';
import SuccessScreen from '../screens/accounts/SuccessScreen';

const Stack = createStackNavigator();

function SignupStack() {
  return (
    <Stack.Navigator
      initialRouteName="정보입력"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="정보입력" component={SignupScreen} />
      <Stack.Screen name="추가정보" component={SignupScreen2} />
      <Stack.Screen name="약관" component={TermsScreen} />
      <Stack.Screen name="윙스팬" component={WingspanScreen} />
      <Stack.Screen name="완료" component={SuccessScreen} />
    </Stack.Navigator>
  );
}

export default SignupStack;
