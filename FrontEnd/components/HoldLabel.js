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
  yellow: {
    name: '노랑 홀드',
    backgroundColor: '#F3F352',
    fontColor: '#535353',
  },
  black: {
    name: '검정 홀드',
    backgroundColor: 'black',
    fontColor: 'white',
  },
  pink: {
    name: '분홍 홀드',
    backgroundColor: '#EC33B8',
    fontColor: 'white',
  },
};

export default HoldLabel;
