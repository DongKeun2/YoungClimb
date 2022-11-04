import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {setIsOpen} from '../utils/slices/ProfileSlice';

import SettingIcon from '../assets/image/header/settingIcon.svg';

const DropDown = ({navigation}) => {
  const dispatch = useDispatch();

  const isOpen = useSelector(state => state.profile.isOpen);

  return (
    <View style={styles.dropDownMenu}>
      <TouchableOpacity onPress={() => dispatch(setIsOpen(!isOpen))}>
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
