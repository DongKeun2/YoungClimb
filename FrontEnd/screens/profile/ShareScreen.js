import React from 'react';
import {WebView} from 'react-native-webview';

import CustomSubHeader from '../../components/CustomSubHeader';

function ShareScreen({navigation}) {
  return (
    <>
      <CustomSubHeader title={'공유하기'} navigation={navigation} />
      <WebView source={{uri: 'https://k7a701.p.ssafy.io/share'}} />
    </>
  );
}

export default ShareScreen;
