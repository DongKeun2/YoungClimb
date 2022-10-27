import React from 'react';
import {View, Text} from 'react-native';
import CustomSubHeader from '../../components/CustomSubHeader';

function PostAddInfoScreen({navigation}) {
  return (
    <View>
      <CustomSubHeader title="정보 입력" navigation={navigation} />
      <Text>정보 입력</Text>
    </View>
  );
}

export default PostAddInfoScreen;
