import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function LevelLabel({color}) {
  return (
    <View style={styles.labelContainer}>
      <View
        style={[
          styles.label,
          {backgroundColor: levelItem[color].backgroundColor},
        ]}>
        <Text style={[styles.font, {color: levelItem[color].fontColor}]}>
          {levelItem[color].name}
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
    name: '파랑 Lv',
    backgroundColor: '#6A74A4',
    fontColor: 'white',
  },
  red: {
    name: '빨강 Lv',
    backgroundColor: '#EB4256',
    fontColor: 'white',
  },
  green: {
    name: '초록 Lv',
    backgroundColor: '#77F263',
    fontColor: 'white',
  },
};
