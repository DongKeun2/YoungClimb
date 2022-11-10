/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import UserAvatar from './UserAvatar';

import HoldIcon from '../assets/image/hold/hold.svg';

import {YCLevelColorDict} from '../assets/info/ColorInfo';

function Recomment({recomment}) {
  return (
    <View style={styles.recommentContainer}>
      <UserAvatar source={{uri: recomment.user.image}} size={32} />
      <View style={styles.recommentInfo}>
        <View style={styles.recommentMain}>
          <View style={{...styles.iconText, alignItems: 'center'}}>
            <Text
              style={{
                ...styles.recommentTextStyle,
                fontWeight: '600',
                marginRight: 5,
              }}>
              {recomment.user.nickname}
            </Text>
            <HoldIcon
              width={15}
              height={15}
              color={YCLevelColorDict[recomment.user.rank]}
            />
          </View>
          <Text style={styles.recommentTextStyle}>{recomment.content}</Text>
        </View>
        <View style={styles.recommentSub}>
          <Text style={{fontSize: 12, color: '#a7a7a7'}}>
            {recomment.createdAt}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recommentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 3,
  },
  recommentInfo: {
    width: '95%',
    marginLeft: 8,
  },
  recommentMain: {
    width: '98%',
  },
  recommentSub: {
    display: 'flex',
    flexDirection: 'row',
  },
  recommentTextStyle: {
    color: 'black',
    fontSize: 14,
  },
  iconText: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Recomment;
