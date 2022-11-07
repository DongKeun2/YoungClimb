import React from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native';

function ReelsItem({item}) {
  return (
    <View
      style={{
        ...styles.pageItem,
        backgroundColor: `${item.color}`,
      }}>
      <Text style={{color: 'black', fontSize: 30}}>{item.num}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageItem: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReelsItem;
