import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {enableScreens} from 'react-native-screens';
import { Alert } from 'react-native';
import store from './utils/store';
import YoungClimb from './screens/YoungClimb';

enableScreens();
export default function App() {
  return (
    <Provider store={store}>
      <YoungClimb />
    </Provider>
  );
}
