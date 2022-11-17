import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  followingFollow,
  followerFollow,
  followSubmit,
  profileFollow,
  followingFollowAfter,
  followerFollowAfter,
} from '../utils/slices/ProfileSlice';

import followAddIcon from '../assets/image/profile/followA.png';
import followDeleteIcon from '../assets/image/profile/followD.png';

function FollowBtn({follow, nickname, type, idx, profileUser}) {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.accounts.currentUser);
  function onClickFollow() {
    if (type === 'profile') {
      dispatch(followSubmit(nickname)).then(res => {
        dispatch(profileFollow(res.payload));
      });
    } else if (type === 'following') {
      dispatch(followSubmit(nickname)).then(res => {
        dispatch(followingFollowAfter(profileUser));
        dispatch(followingFollow({idx: idx, follow: res.payload}));
      });
    } else if (type === 'follower') {
      dispatch(followSubmit(nickname)).then(res => {
        dispatch(followerFollowAfter(profileUser));
        dispatch(followerFollow({idx: idx, follow: res.payload}));
      });
    }
  }
  return (
    <>
      {currentUser.nickname === nickname ? null : follow ? (
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
