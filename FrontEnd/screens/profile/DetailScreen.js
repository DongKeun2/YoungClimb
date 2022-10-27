import React from 'react';
import {View, Text} from 'react-native';
import CustomSubHeader from '../../components/CustomMainHeader';

function DetailScreen({navigation}) {
  return (
    <>
      <CustomSubHeader title="게시물" />
      <Text>게시물 상세</Text>
    </>
  );
}

export default DetailScreen;
