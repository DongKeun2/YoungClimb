/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import UserAvatar from './UserAvatar';

import avatar from '../assets/image/initial/background.png';

function Recomment({recomment}) {
  return (
    <View style={styles.recommentContainer}>
      <UserAvatar source={avatar} rank={recomment.user.rank} size={28} />
      <View style={styles.recommentInfo}>
        <View style={styles.recommentMain}>
          <Text style={{...styles.recommentTextStyle, fontWeight: '600'}}>
            {recomment.user.nickname}
            <Text
              style={{
                ...styles.recommentTextStyle,
                fontWeight: '500',
              }}>
              {'  ' + recomment.content}
            </Text>
          </Text>
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
    width: '85%',
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
    fontSize: 13,
  },
});

export default Recomment;
