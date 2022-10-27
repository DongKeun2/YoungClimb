import React from 'react';
import {View, Text} from 'react-native';
import CustomSubHeader from '../../components/CustomSubHeader';

function NoticeScreen({navigation}) {
  return (
    <View>
      <CustomSubHeader title="알림" navigation={navigation} />
      <Text>알림 목록</Text>
    </View>
  );
}

export default NoticeScreen;
