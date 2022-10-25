import React from 'react';
import {ScrollView, Text, Button} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={{fontSize: 120}}>Home!</Text>
      <Text style={{fontSize: 120}}>Home!</Text>
      <Text style={{fontSize: 120}}>Home!</Text>
      <Text style={{fontSize: 120}}>Home!</Text>
      <Text style={{fontSize: 120}}>Home!</Text>
      <Text style={{fontSize: 120}}>Home!</Text>
      <Button title="홈" onPress={() => navigation.navigate('댓글')} />
    </ScrollView>
  );
}

export default HomeScreen;
