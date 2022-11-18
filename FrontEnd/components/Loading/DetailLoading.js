import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

function DetailLoading() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileBox}>
            <View style={styles.avatar} />
            <View style={styles.profileTextBox}>
              <View style={styles.profileNickname} />
              <View style={styles.profileSize} />
            </View>
          </View>
        </View>

        <View style={styles.introBox} />

        <View
          style={[
            styles.VideoBox,
            {
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').width,
            },
          ]}
        />
        <View style={styles.likeBox} />
        <View style={styles.viewBox} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F4F4F4F4',
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
  },
  profileTextBox: {
    alignItems: 'flex-start',
    width: '70%',
    marginLeft: 10,
  },
  profileNickname: {
    backgroundColor: '#F4F4F4F4',
    marginBottom: 10,
    width: '50%',
    height: 15,
  },
  profileSize: {
    backgroundColor: '#F4F4F4F4',
    width: '80%',
    height: 15,
    paddingVertical: 5,
  },
  introBox: {
    width: '80%',
    height: 13,
    marginLeft: 15,
    alignSelf: 'flex-start',
    backgroundColor: '#F4F4F4F4',
    margin: 10,
  },
  horizonLine: {
    borderColor: '#F4F4F4F4',
    borderWidth: 0.2,
    width: '100%',
    height: 0,
  },
  VideoBox: {backgroundColor: '#F4F4F4F4'},
  likeBox: {
    width: '50%',
    height: 15,
    marginLeft: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#F4F4F4F4',
    margin: 10,
  },
  viewBox: {
    width: '50%',
    height: 15,
    marginLeft: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#F4F4F4F4',
    margin: 5,
  },
});

export default DetailLoading;
