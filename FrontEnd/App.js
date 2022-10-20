import React from 'react';
import {Provider} from 'react-redux';
import {enableScreens} from 'react-native-screens';

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
