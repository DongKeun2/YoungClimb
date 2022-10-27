import React from 'react';
import {ScrollView, Text, Button} from 'react-native';
import CustomMainHeader from '../../components/CustomMainHeader';

function HomeScreen({navigation}) {
  return (
    <>
      <CustomMainHeader type="홈" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Button title="상세보가" onPress={() => navigation.navigate('댓글')} />
      </ScrollView>
    </>
  );
}

export default HomeScreen;
