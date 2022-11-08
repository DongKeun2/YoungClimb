import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import SettingIcon from '../assets/image/header/settingIcon.svg';

const DropDown = ({navigation}) => {
  return (
    <View style={styles.dropDownMenu}>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <SettingIcon style={{marginRight: 10}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownMenu: {},
  text: {
    color: 'black',
  },
});

export default DropDown;
