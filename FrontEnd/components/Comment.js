/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import UserAvatar from './UserAvatar';
import Recomment from './Recomment';

import avatar from '../assets/image/initial/background.png';
import EmptyHeart from '../assets/image/feed/emptyHeart.svg';
import FillHeart from '../assets/image/feed/fillHeart.svg';

function Comment({comment, navigation}) {
  const [isViewRecomment, setIsViewRecomment] = useState(false);

  const viewRecomment = () => {
    setIsViewRecomment(true);
  };

  return (
    <View style={styles.commentContainer}>
      <UserAvatar source={avatar} rank={comment.user.rank} size={32} />
      <View style={styles.commentInfo}>
        <View style={styles.commentMain}>
          <Text style={{...styles.commentTextStyle, fontWeight: '600'}}>
            {comment.user.nickname}
            <Text
              style={{
                ...styles.commentTextStyle,
                fontWeight: '500',
              }}>
              {'  ' + comment.content}
            </Text>
          </Text>
        </View>
        <View style={styles.commentSub}>
          <Text style={{fontSize: 12, color: '#a7a7a7'}}>
            {comment.createdAt}
          </Text>
          <Text style={{fontSize: 12, color: '#a7a7a7', marginLeft: 8}}>
            답글 달기
          </Text>
        </View>
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
                <Recomment
                  key={idx}
                  recomment={recomment}
                  navigation={navigation}
                />
              );
            })
          ) : null}
        </View>
      </View>
      {comment.isLiked ? (
        <TouchableOpacity onPress={() => null}>
          <FillHeart />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => null}>
          <EmptyHeart />
        </TouchableOpacity>
      )}
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
});

export default Comment;
