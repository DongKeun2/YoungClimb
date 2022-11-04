import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {follow} from '../utils/slices/ProfileSlice';
import {getCurrentUser} from '../utils/Token';

import followAddIcon from '../assets/image/profile/followA.png';
import followDeleteIcon from '../assets/image/profile/followD.png';

function FollowBtn({isFollow, nickname}) {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.accounts.currentUser);
  function onClickFollow() {
    dispatch(follow(nickname));
    console.log(nickname, '팔로우 버튼 클릭');
  }
  return (
    <>
      {currentUser.nickname === nickname ? null : isFollow ? (
        <TouchableOpacity onPress={onClickFollow} style={styles.unfollowBtn}>
          <Image source={followDeleteIcon} style={styles.followIcon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onClickFollow} style={styles.followBtn}>
          <Image source={followAddIcon} style={styles.followIcon} />
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  followBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 65,
    height: 30,
    backgroundColor: '#F34D7F',
  },
  unfollowBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 65,
    height: 30,
    backgroundColor: '#F0F0F0',
  },
});

export default FollowBtn;
