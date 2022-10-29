import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function HoldLabel({color}) {
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

const levelItem = {
  red: {
    name: '빨강 홀드',
    backgroundColor: '#F05D5D',
    fontColor: 'white',
  },
  blue: {
    name: '파랑 홀드',
    backgroundColor: '#3B4BA0',
    fontColor: 'white',
  },
};

export default HoldLabel;
