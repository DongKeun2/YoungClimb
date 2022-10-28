import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function LevelLabel({name, color}) {
  return (
    <View style={styles.labelContainer}>
      <View
        style={[
          styles.label,
          {backgroundColor: levelItem[color].backgroundColor},
        ]}>
        <Text style={[styles.font, {color: levelItem[color].fontColor}]}>
          {name}
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
    borderRadius: 2,
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

const levelItem = {
  blue: {
    backgroundColor: '#6A74A4',
    fontColor: 'white',
  },
};
