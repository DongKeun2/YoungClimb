import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {levelColorDict} from '../assets/info/ColorInfo';

function LevelLabel({color}) {
  return (
    <View style={styles.labelContainer}>
      <View style={[styles.label, {backgroundColor: levelColorDict[color]}]}>
        <Text
          style={
            color === '흰색' || color === '노랑'
              ? [styles.font, {color: 'black'}]
              : [styles.font, {color: 'white'}]
          }>
          Lv. {color}
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
    marginHorizontal: 5,
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

export default LevelLabel;
