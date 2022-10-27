import React from 'react';
import {View, Text, Button} from 'react-native';
import CustomMainHeader from '../components/CustomMainHeader';

function SearchScreen({navigation}) {
  return (
    <>
      <CustomMainHeader type="검색" />
      <View>
        <Text>Search!</Text>
        <Button title="검색" onPress={() => navigation.navigate('검색 결과')} />
      </View>
    </>
  );
}

export default SearchScreen;
