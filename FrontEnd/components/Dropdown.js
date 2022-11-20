import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import SettingIcon from '../assets/image/header/settingIcon.svg';

const DropDown = ({navigation}) => {
  return (
    <View style={styles.dropDownMenu}>
      <TouchableOpacity
        style={styles.touchRange}
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <SettingIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownMenu: {},
  text: {
    color: 'black',
  },
  touchRange: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});

export default DropDown;
