import React from 'react';
import {View, StyleSheet} from 'react-native';

function ReelsLoading() {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.header}>
          <View style={styles.profileBox}>
            <View style={styles.avatar} />
            <View style={styles.profileTextBox}>
              <View style={styles.profileNickname} />
            </View>
          </View>
        </View>
        <View style={styles.introBox} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  info: {
    position: 'absolute',
    bottom: 10,
    left: 0,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333333',
  },
  header: {
    alignSelf: 'center',
    width: '98%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileTextBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '70%',
    marginLeft: 10,
  },
  profileNickname: {
    backgroundColor: '#333333',
    width: '70%',
    height: 20,
  },
  introBox: {
    width: '80%',
    height: 13,
    marginLeft: 15,
    alignSelf: 'flex-start',
    backgroundColor: '#333333',
    margin: 10,
  },
});

export default ReelsLoading;
