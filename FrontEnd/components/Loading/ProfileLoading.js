import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import CustomMainHeader from '../../components/CustomMainHeader';
import CustomSubHeader from '../../components/CustomSubHeader';

import boardIcon from '../../assets/image/profile/board.png';
import boardActiveIcon from '../../assets/image/profile/boardA.png';
import bookmarkIcon from '../../assets/image/profile/bookmark.png';
import bookmarkActiveIcon from '../../assets/image/profile/bookmarkA.png';

function ProfileLoading({navigation, type, route}) {
  return (
    <>
      {route.params.initial ? (
        <CustomMainHeader type="프로필" navigation={navigation} />
      ) : (
        <CustomSubHeader
          title={`${route.params.nickname}`}
          navigation={navigation}
        />
      )}

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

        <View style={styles.horizonLine} />

        <View style={styles.InfoContainer}>
          <View style={styles.InfoBox}>
            <View style={styles.InfoTitle} />
            <View style={styles.InfoContent} />
          </View>
          <View style={styles.InfoBox}>
            <View style={styles.InfoTitle} />
            <View style={styles.InfoContent} />
          </View>
          <View style={styles.InfoBox}>
            <View style={styles.InfoTitle} />
            <View style={styles.InfoContent} />
          </View>
          <View style={styles.InfoBox}>
            <View style={styles.InfoTitle} />
            <View style={styles.InfoContent} />
          </View>
        </View>

        {type === 'board' ? (
          <View style={styles.tabBox}>
            <View style={styles.activeTab}>
              <Image source={boardActiveIcon} style={styles.tabIcon} />
            </View>
            <View style={styles.tabBtn}>
              <Image source={bookmarkIcon} style={styles.tabIcon} />
            </View>
          </View>
        ) : (
          <View style={styles.tabBox}>
            <View style={styles.tabBtn}>
              <Image source={boardIcon} style={styles.tabIcon} />
            </View>
            <View style={styles.activeTab}>
              <Image source={bookmarkActiveIcon} style={styles.tabIcon} />
            </View>
          </View>
        )}
        <View style={styles.horizonLine} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#C4C4C4',
  },
  header: {
    alignSelf: 'center',
    width: '90%',
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
    backgroundColor: '#C4C4C4',
    marginBottom: 10,
    width: '50%',
    height: 15,
  },
  profileSize: {
    backgroundColor: '#C4C4C4',
    width: '80%',
    height: 15,
    paddingVertical: 5,
  },
  introBox: {
    width: '80%',
    height: 13,
    marginLeft: 15,
    alignSelf: 'flex-start',
    backgroundColor: '#C4C4C4',
    margin: 10,
  },
  horizonLine: {
    borderColor: 'black',
    borderWidth: 0.2,
    width: '100%',
    height: 0,
  },
  InfoContainer: {
    width: '100%',
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 3,
  },
  InfoBox: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    height: 50,
  },
  InfoTitle: {
    height: 15,
    width: 30,
    marginBottom: 10,
    backgroundColor: '#C4C4C4',
  },
  InfoContent: {height: 15, width: 15, backgroundColor: '#C4C4C4'},
  tabBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  tabBtn: {
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activeTab: {
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  intro: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  active: {
    opacity: 1,
    visibility: 'visible',
    transform: [{translateY: 0}],
  },
});

export default ProfileLoading;
