import React from 'react';
import {View, Text} from 'react-native';
import CustomSubHeader from '../components/CustomSubHeader';

function SearchResultScreen({navigation}) {
  return (
    <View>
      <CustomSubHeader title="검색 결과" navigation={navigation} />
    </View>
  );
}

export default SearchResultScreen;
