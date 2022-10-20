import React from 'react';
import {View, Text, Button} from 'react-native';

function SearchScreen({navigation}) {
  return (
    <View>
      <Text>Search!</Text>
      <Button title="검색" onPress={() => navigation.navigate('검색 결과')} />
    </View>
  );
}

export default SearchScreen;
