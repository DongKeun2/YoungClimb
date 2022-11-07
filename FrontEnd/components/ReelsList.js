import React from 'react';
import {Dimensions, View, FlatList, StyleSheet} from 'react-native';
import ReelsItem from './ReelsItem';

function ReelsList({reels}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={reels}
        decelerationRate="fast"
        disableIntervalMomentum
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => <ReelsItem item={item} />}
        snapToInterval={Dimensions.get('window').height}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReelsList;
