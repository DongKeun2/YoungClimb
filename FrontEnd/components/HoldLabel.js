import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {holdColorDict} from '../assets/info/ColorInfo';

function HoldLabel({color}) {
  return (
    <View style={styles.labelContainer}>
      <View style={[styles.label, {backgroundColor: holdColorDict[color]}]}>
        <Text
          style={
            color === '흰색' || color === '노랑'
              ? [styles.font, {color: 'black'}]
              : [styles.font, {color: 'white'}]
          }>
          {color} 홀드
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    borderRadius: 3,
    elevation: 0.8,
  },
  font: {
    marginVertical: 1,
    marginHorizontal: 5,
    fontSize: 11.5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HoldLabel;
