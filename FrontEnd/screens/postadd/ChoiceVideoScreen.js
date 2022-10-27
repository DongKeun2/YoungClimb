import React from 'react';
import {View, Text} from 'react-native';
import CustomSubHeader from '../../components/CustomSubHeader';

function ChoiceVideoScreen({navigation}) {
  return (
    <View>
      <CustomSubHeader
        title="영상 선택"
        rightTitle="다음"
        navigation={navigation}
        isVideo={true}
      />
      <Text>영상 선택</Text>
    </View>
  );
}

export default ChoiceVideoScreen;
