import React from 'react';
import {View, Text} from 'react-native';
import CustomSubHeader from '../../components/CustomSubHeader';

function DetailScreen({navigation}) {
  return (
    <>
      <CustomSubHeader navigation={navigation} title="게시물" />
      <Text>게시물</Text>
    </>
  );
}

export default DetailScreen;
