/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CustomSubHeader from '../../components/CustomSubHeader';

import UserAvatar from '../../components/UserAvatar';
import HoldLabel from '../../components/HoldLabel';
import LevelLabel from '../../components/LevelLabel';
import Comment from '../../components/Comment';
import CommentInput from '../../components/CommentInput';

import HoldIcon from '../../assets/image/hold/hold.svg';

import {YCLevelColorDict} from '../../assets/info/ColorInfo';

import {fetchFeedComment} from '../../utils/slices/PostSlice';
import PostLoading from '../../components/Loading/PostLoading';

function PostScreen({navigation, route}) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchFeedComment(route.params.boardId)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, route]);

  const board = useSelector(state => state.post.boardInfoComment.boardDto);
  const comments = useSelector(
    state => state.post.boardInfoComment.commentDtos,
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomSubHeader title="댓글" navigation={navigation} />
      {isLoading ? (
        <PostLoading />
      ) : board ? (
        <>
          <ScrollView
            style={{marginBottom: 50}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.headerBox}>
              {/* 피드 상단 헤더 */}
              <View style={styles.feedHeader}>
                <View style={styles.headerTop}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('서브프로필', {
                        initial: false,
                        nickname: board.createUser.nickname,
                      });
                    }}
                    activeOpacity={1}
                    style={styles.iconText}>
                    <UserAvatar
                      source={{uri: board.createUser.image}}
                      size={36}
                    />
                    <View style={styles.headerTextGroup}>
                      <View style={{...styles.iconText, alignItems: 'center'}}>
                        <Text
                          style={{
                            ...styles.feedTextStyle,
                            fontSize: 16,
                            fontWeight: '600',
                            marginRight: 5,
                          }}>
                          {board.createUser.nickname}
                        </Text>
                        <HoldIcon
                          width={18}
                          height={18}
                          color={YCLevelColorDict[board.createUser.rank]}
                        />
                      </View>
                      <Text style={{...styles.feedTextStyle, fontSize: 12}}>
                        {board.createdAt}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.wallInfo}>
                  <Text style={{...styles.feedTextStyle, marginRight: 8}}>
                    {board.centerName}
                  </Text>
                  {board.wallName ? (
                    <Text style={{...styles.feedTextStyle, marginRight: 8}}>
                      {board.wallName}
                    </Text>
                  ) : null}
                  <Text style={{...styles.feedTextStyle, marginRight: 3}}>
                    {board.difficulty}
                  </Text>
                  <LevelLabel color={board.centerLevelColor} />
                  <HoldLabel color={board.holdColor} />
                </View>
              </View>
              {/* 본문 */}
              {board.content ? (
                <View style={styles.contentSummary}>
                  <Text style={styles.contentPreview}>{board.content}</Text>
                </View>
              ) : null}
            </View>
            {comments?.map((comment, idx) => {
              return (
                <Comment
                  key={idx}
                  boardId={board.id}
                  comment={comment}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
          <CommentInput boardId={board.id} navigation={navigation} />
        </>
      ) : (
        <View style={styles.container} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  headerBox: {
    backgroundColor: 'white',
    borderBottomWidth: 0.2,
    borderColor: 'black',
    paddingBottom: 8,
  },
  feedHeader: {
    margin: 8,
  },
  headerTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconText: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerTextGroup: {
    marginLeft: 8,
    display: 'flex',
    justifyContent: 'space-between',
  },
  feedTextStyle: {
    color: 'black',
    fontSize: 14,
  },
  wallInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
  },
  solvedDate: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  popularInfo: {
    marginTop: 8,
    marginHorizontal: 8,
  },
  likeGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentSummary: {
    marginVertical: 3,
    marginHorizontal: 13,
  },
  contentPreview: {
    color: 'black',
    fontSize: 14,
    overflow: 'hidden',
  },
  commentSummary: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  commentPreview: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default PostScreen;
