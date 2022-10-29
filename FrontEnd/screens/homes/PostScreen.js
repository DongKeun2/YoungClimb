import React from 'react';
import {View, Text} from 'react-native';
import CustomSubHeader from '../../components/CustomSubHeader';

function PostScreen({navigation, route}) {
  return (
    <View>
      <CustomSubHeader title="댓글" navigation={navigation} />
      <Text style={{color: 'black', fontSize: 30}}>{route.params.id}번 게시글</Text>
    </View>
  );
}

export default PostScreen;
