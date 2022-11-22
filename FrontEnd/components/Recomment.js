/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import UserAvatar from './UserAvatar';

import HoldIcon from '../assets/image/hold/hold.svg';

import {YCLevelColorDict} from '../assets/info/ColorInfo';

import {
  fetchFeedComment,
  fetchDetail,
  deleteComment,
} from '../utils/slices/PostSlice';

function Recomment({recomment, board}) {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.accounts.currentUser);

  const commentDelete = commentId => {
    dispatch(deleteComment(commentId)).then(() => {
      dispatch(fetchFeedComment(board.id));
      dispatch(fetchDetail(board.id));
    });
    Alert.alert('삭제되었습니다.');
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onLongPress={() => {
        if (
          currentUser.nickname === recomment.user.nickname ||
          currentUser.nickname === board.createUser.nickname
        ) {
          Alert.alert('댓글 삭제', '댓글을 삭제하시겠습니까?', [
            {text: '삭제', onPress: () => commentDelete(recomment.id)},
            {
              text: '취소',
              onPress: () => Alert.alert('', '취소되었습니다.'),
            },
          ]);
        }
      }}
      style={styles.recommentContainer}>
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
    </TouchableOpacity>
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
