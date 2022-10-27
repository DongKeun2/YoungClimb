import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Backicon from '../assets/image/header/backIcon.svg';

const CustomSubHeader = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        <Backicon style={{marginLeft: 5, marginRight: 5}} />
      </TouchableOpacity>
      <Text style={{fontSize: 16}}>{props.title}</Text>
    </View>
  );
};

CustomSubHeader.defaultProps = {
  title: 'untitled',
  onPress: () => null,
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: 'white',
  },
});

export default CustomSubHeader;
