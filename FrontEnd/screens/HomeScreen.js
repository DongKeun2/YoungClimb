import React from 'react';
import {ScrollView, Text, Button} from 'react-native';
import CustomMainHeader from '../components/CustomMainHeader';

function HomeScreen({navigation}) {
  return (
    <>
      <CustomMainHeader type="홈" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{fontSize: 120}}>Home!</Text>
        <Text style={{fontSize: 120}}>Home!</Text>
        <Text style={{fontSize: 120}}>Home!</Text>
        <Text style={{fontSize: 120}}>Home!</Text>
        <Text style={{fontSize: 120}}>Home!</Text>
        <Text style={{fontSize: 120}}>Home!</Text>
        <Button title="홈" onPress={() => navigation.navigate('댓글')} />
      </ScrollView>
    </>
  );
}

export default HomeScreen;
