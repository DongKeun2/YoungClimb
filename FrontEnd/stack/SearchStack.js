import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SearchScreen from '../screens/SearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';

const Stack = createStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="검색">
      <Stack.Screen name="검색" component={SearchScreen} />
      <Stack.Screen name="검색 결과" component={SearchResultScreen} />
    </Stack.Navigator>
  );
}

export default SearchStack;
