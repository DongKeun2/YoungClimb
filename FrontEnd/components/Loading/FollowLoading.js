import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import {TextInput} from 'react-native-gesture-handler';

import CustomSubHeader from '../../components/CustomSubHeader';

import searchIcon from '../../assets/image/profile/searchIcon.png';

function FollowLoading({navigation, route, type}) {
  return (
    <>
      <CustomSubHeader title={route.params.nickname} navigation={navigation} />
      <View style={styles.container}>
        {type === 'following' ? (
          <View style={styles.tabBox}>
            <View style={styles.activeTab}>
              <Text
                style={[styles.tabFont, {fontWeight: 'bold', color: 'white'}]}>
                팔로잉(0)
              </Text>
            </View>
            <View style={styles.tabBtn}>
              <Text style={styles.tabFont}>팔로워(0)</Text>
            </View>
          </View>
        ) : (
          <View style={styles.tabBox}>
            <View style={styles.tabBtn}>
              <Text style={styles.tabFont}>팔로잉(0)</Text>
            </View>
            <View style={styles.activeTab}>
              <Text
                style={[styles.tabFont, {fontWeight: 'bold', color: 'white'}]}>
                팔로워(0)
              </Text>
            </View>
          </View>
        )}
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="닉네임을 검색하세요."
            placeholderTextColor={'#ADADAD'}
          />
          <Image style={styles.searchIcon} source={searchIcon} />
        </View>

        <View style={styles.followContainer}>
          <View style={styles.profileBox}>
            <View style={styles.avatar} />
            <View style={styles.profileTextBox}>
              <View style={styles.profileNickname} />
              <View style={styles.profileSize} />
            </View>
          </View>
          <View style={styles.profileBox}>
            <View style={styles.avatar} />
            <View style={styles.profileTextBox}>
              <View style={styles.profileNickname} />
              <View style={styles.profileSize} />
            </View>
          </View>
          <View style={styles.profileBox}>
            <View style={styles.avatar} />
            <View style={styles.profileTextBox}>
              <View style={styles.profileNickname} />
              <View style={styles.profileSize} />
            </View>
          </View>
          <View style={styles.profileBox}>
            <View style={styles.avatar} />
            <View style={styles.profileTextBox}>
              <View style={styles.profileNickname} />
              <View style={styles.profileSize} />
            </View>
          </View>
          <View style={styles.profileBox}>
            <View style={styles.avatar} />
            <View style={styles.profileTextBox}>
              <View style={styles.profileNickname} />
              <View style={styles.profileSize} />
            </View>
          </View>
          <View style={styles.profileBox}>
            <View style={styles.avatar} />
            <View style={styles.profileTextBox}>
              <View style={styles.profileNickname} />
              <View style={styles.profileSize} />
            </View>
          </View>
          <View style={styles.profileBox}>
            <View style={styles.avatar} />
            <View style={styles.profileTextBox}>
              <View style={styles.profileNickname} />
              <View style={styles.profileSize} />
            </View>
          </View>
          <View style={styles.profileBox}>
            <View style={styles.avatar} />
            <View style={styles.profileTextBox}>
              <View style={styles.profileNickname} />
              <View style={styles.profileSize} />
            </View>
          </View>
          <View style={styles.profileBox}>
            <View style={styles.avatar} />
            <View style={styles.profileTextBox}>
              <View style={styles.profileNickname} />
              <View style={styles.profileSize} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBtn: {
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4F4',
  },
  activeTab: {
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F34D7F',
  },
  searchBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  searchInput: {
    width: '80%',
    borderWidth: 1,
    borderBottomColor: '#464646',
    borderRadius: 10,
    fontSize: 14,
    padding: 5,
    paddingLeft: 40,
    color: 'black',
  },
  searchIcon: {
    position: 'absolute',
    top: 7,
    left: '12%',
  },
  followContainer: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 5,
  },
  profileBox: {
    display: 'flex',
    marginLeft: 20,
    marginBottom: 15,
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
  tabFont: {
    fontSize: 15,
    color: 'black',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: '#F4F4F4F4',
  },
  nickname: {color: 'black', fontSize: 14, fontWeight: 'bold'},
  text: {color: 'black', fontSize: 12},
});

export default FollowLoading;
