/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import UserAvatar from './UserAvatar';
import Recomment from './Recomment';

import EmptyHeart from '../assets/image/feed/emptyHeart.svg';
import FillHeart from '../assets/image/feed/fillHeart.svg';
import HoldIcon from '../assets/image/hold/hold.svg';

import {YCLevelColorDict} from '../assets/info/ColorInfo';

import {
  commentLikeSubmit,
  changeCommentIdForRe,
  changeNicknameForRe,
  changeIsFocusedInput,
  fetchFeedComment,
  fetchDetail,
  deleteComment,
} from '../utils/slices/PostSlice';

function Comment({comment, board}) {
  const dispatch = useDispatch();

  const [isViewRecomment, setIsViewRecomment] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState(0);
  const [likePress, setLikePress] = useState(false);

  const currentUser = useSelector(state => state.accounts.currentUser);

  useEffect(() => {
    setIsLiked(comment.isLiked);
    setLike(comment.commentLikeNum);
  }, [comment.isLiked, comment.commentLikeNum]);

  const viewRecomment = () => {
    setIsViewRecomment(true);
  };

  const readyReComment = (id, nickname) => {
    dispatch(changeCommentIdForRe(id));
    dispatch(changeNicknameForRe(nickname));
    dispatch(changeIsFocusedInput(true));
  };

  const commentLike = id => {
    setLikePress(true);
    dispatch(commentLikeSubmit(id))
      .then(() => {
        isLiked ? setLike(like - 1) : setLike(like + 1);
        setIsLiked(!isLiked);
        setLikePress(false);
      })
      .catch(() => setLikePress(false));
  };

  const commentDelete = commentId => {
    dispatch(deleteComment(commentId)).then(() => {
      dispatch(fetchFeedComment(board.id));
      dispatch(fetchDetail(board.id));
    });
    Alert.alert('삭제되었습니다.');
  };

  return (
    <View style={styles.commentContainer}>
      <UserAvatar source={{uri: comment.user.image}} size={32} />
      <View style={styles.commentInfo}>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={() => {
            if (
              currentUser.nickname === comment.user.nickname ||
              currentUser.nickname === board.createUser.nickname
            ) {
              Alert.alert('댓글 삭제', '댓글을 삭제하시겠습니까?', [
                {text: '삭제', onPress: () => commentDelete(comment.id)},
                {
                  text: '취소',
                  onPress: () => Alert.alert('', '취소되었습니다.'),
                },
              ]);
            }
          }}
          style={{...styles.commentMain, marginBottom: 3}}>
          <View style={{...styles.iconText, alignItems: 'center'}}>
            <Text
              style={{
                ...styles.commentTextStyle,
                fontWeight: '600',
                marginRight: 5,
              }}>
              {comment.user.nickname}
            </Text>
            <HoldIcon
              width={15}
              height={15}
              color={YCLevelColorDict[comment.user.rank]}
            />
          </View>
          <Text style={styles.commentTextStyle}>{comment.content}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={() => {
            if (
              currentUser.nickname === comment.user.nickname ||
              currentUser.nickname === board.createUser.nickname
            ) {
              Alert.alert('댓글 삭제', '댓글을 삭제하시겠습니까?', [
                {text: '삭제', onPress: () => commentDelete(comment.id)},
                {
                  text: '취소',
                  onPress: () => Alert.alert('', '취소되었습니다.'),
                },
              ]);
            }
          }}
          style={styles.commentSub}>
          <Text style={{fontSize: 12, color: '#a7a7a7'}}>
            {comment.createdAt}
          </Text>
          <TouchableOpacity
            style={{paddingHorizontal: 8}}
            onPress={() => readyReComment(comment.id, comment.user.nickname)}>
            <Text style={{fontSize: 12, color: '#a7a7a7'}}>답글 달기</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{marginTop: 3}}>
          {!isViewRecomment && comment.reComment.length ? (
            <Text
              style={{fontSize: 12, color: '#525252'}}
              onPress={viewRecomment}>
              {comment.reComment.length}개 답글 보기
            </Text>
          ) : isViewRecomment && comment.reComment.length ? (
            comment.reComment.map((recomment, idx) => {
              return (
                <Recomment key={idx} recomment={recomment} board={board} />
              );
            })
          ) : null}
        </View>
      </View>
      <View style={styles.likeGroup}>
        <TouchableOpacity
          onPress={() => commentLike(comment.id)}
          disabled={likePress}>
          {isLiked ? <FillHeart /> : <EmptyHeart />}
        </TouchableOpacity>
        <Text>{like}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  commentInfo: {
    width: '80%',
    marginLeft: 3,
  },
  commentMain: {
    width: '98%',
  },
  commentSub: {
    display: 'flex',
    flexDirection: 'row',
  },
  commentTextStyle: {
    color: 'black',
    fontSize: 14,
  },
  iconText: {
    display: 'flex',
    flexDirection: 'row',
  },
  likeGroup: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default Comment;
