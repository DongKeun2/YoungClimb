import React from 'react';
import {ScrollView, Text, Button} from 'react-native';
import CustomMainHeader from '../../components/CustomMainHeader';
import HomeFeed from '../../components/HomeFeed';

function HomeScreen({navigation}) {
  return (
    <>
      <CustomMainHeader type="홈" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeFeed navigation={navigation} />
        <HomeFeed navigation={navigation} />
        <HomeFeed navigation={navigation} />
      </ScrollView>
    </>
  );
}

export default HomeScreen;
