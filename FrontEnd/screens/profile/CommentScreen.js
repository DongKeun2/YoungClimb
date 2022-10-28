import React from 'react';
import {View, Text} from 'react-native';
import CustomSubHeader from '../../components/CustomSubHeader';

function CommentScreen({navigation}) {
  return (
    <>
      <CustomSubHeader navigation={navigation} title="댓글" />
      <Text>댓글</Text>
    </>
  );
}

export default CommentScreen;
