import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import CustomMainHeader from '../../components/CustomMainHeader';

import UserAvatar from '../../components/UserAvatar';

import followIcon from '../../assets/image/profile/followIcon.png';

function ProfileScreen({navigation}) {
  const userInfo = useSelector(state => state.profile.profileInfo.user);

  function onClickFollow() {
    console.log('팔로우 버튼 클릭');
  }

  return (
    <View style={styles.container}>
      <CustomMainHeader type="프로필" navigation={navigation} />
      <View style={styles.header}>
        <UserAvatar source={userInfo.image} rank={userInfo.rank} size={80} />
        <View style={styles.profileText}>
          <Text>{userInfo.nickname}</Text>
          <Text>
            {userInfo.gender} {userInfo.height}cm {userInfo.shoeSize}mm{' '}
            {userInfo.wingspan}cm
          </Text>
        </View>
        <TouchableOpacity onPress={onClickFollow} style={styles.followBtn}>
          <Image source={followIcon} style={styles.followIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.introBox}>
        <Text style>{userInfo.intro}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileText: {},
  followBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 65,
    height: 30,
    backgroundColor: '#F34D7F',
  },
  introBox: {
    width: '100%',
    alignSelf: 'flex-start',
    margin: 10,
  },
});

export default ProfileScreen;
