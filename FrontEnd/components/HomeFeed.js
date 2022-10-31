/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import UserAvatar from './UserAvatar';
import HoldLabel from './HoldLabel';
import LevelLabel from './LevelLabel';

import avatar from '../assets/image/initial/background.png';
import MenuIcon from '../assets/image/feed/menuIcon.svg';
import CameraIcon from '../assets/image/feed/whiteCamera.svg';
import EmptyHeart from '../assets/image/feed/emptyHeart.svg';
import FillHeart from '../assets/image/feed/fillHeart.svg';
import EmptyScrap from '../assets/image/feed/emptyScrap.svg';
import FillScrap from '../assets/image/feed/fillScrap.svg';
import EyeIcon from '../assets/image/feed/eye.svg';

function HomeFeed({feed, navigation}) {
  const [contentHeight, setHeight] = useState(0);
  const [fullContent, setFullContent] = useState(false);

  const onLayout = e => {
    const {height} = e.nativeEvent.layout;
    setHeight(height);
  };

  const viewFullContent = () => {
    setFullContent(true);
  };

  return (
    <View style={styles.container}>
      {/* 피드 상단 헤더 */}
      <View style={styles.feedHeader}>
        <View style={styles.headerTop}>
          <View style={styles.iconText}>
            <UserAvatar source={avatar} rank={1} size={36} />
            <View style={styles.headerTextGroup}>
              <Text
                style={{
                  ...styles.feedTextStyle,
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                {feed.createUser}
              </Text>
              <Text style={{...styles.feedTextStyle, fontSize: 12}}>
                {feed.createdAt}
              </Text>
            </View>
          </View>
          <MenuIcon width={16} height={16} />
        </View>
        <View style={styles.wallInfo}>
          <Text style={{...styles.feedTextStyle, marginRight: 8}}>
            {feed.centerName}
          </Text>
          <Text style={{...styles.feedTextStyle, marginRight: 8}}>
            {feed.wallName}
          </Text>
          <Text style={{...styles.feedTextStyle, marginRight: 3}}>
            {feed.difficulty}
          </Text>
          <LevelLabel color={feed.centerLevelColor} />
          <HoldLabel color={feed.holdColor} />
        </View>
      </View>
      {/* 동영상 */}
      <View>
        <Text
          style={{
            width: '100%',
            height: 400,
            backgroundColor: '#a7a7a7',
            color: 'white',
            fontSize: 28,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          비디오 자리
        </Text>
        <View style={styles.solvedDate}>
          <CameraIcon />
          <Text
            style={{color: 'white', fontSize: 12, marginLeft: 3, marginTop: 1}}>
            {feed.solvedDate}
          </Text>
        </View>
      </View>
      {/* 좋아요, 스크랩, 조회수 */}
      <View style={styles.popularInfo}>
        <View style={styles.likeGroup}>
          <View style={styles.iconText}>
            {feed.isLiked ? (
              <TouchableOpacity onPress={() => null}>
                <FillHeart style={{marginRight: 5}} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => null}>
                <EmptyHeart style={{marginRight: 5}} />
              </TouchableOpacity>
            )}
            <Text style={styles.feedTextStyle}>
              {feed.like} 명이 좋아합니다.
            </Text>
          </View>
          {feed.isScrap ? (
            <TouchableOpacity onPress={() => null}>
              <FillScrap style={{marginRight: 5}} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => null}>
              <EmptyScrap style={{marginRight: 5}} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.iconText}>
          <EyeIcon style={{marginRight: 5}} />
          <Text style={styles.feedTextStyle}>
            {feed.view} 명이 감상했습니다.
          </Text>
        </View>
      </View>
      {/* 본문, 댓글 미리보기, 댓글 수 */}
      <View style={styles.contentSummary}>
        <View
          onLayout={onLayout}
          style={{position: 'absolute', top: 0, opacity: 0}}>
          <Text style={styles.contentPreview}>{feed.content}</Text>
        </View>
        {!fullContent && contentHeight > 32 ? (
          <TouchableOpacity
            style={styles.viewFullContent}
            onPress={viewFullContent}>
            <Text
              numberOfLines={2}
              ellipsizeMode="clip"
              style={styles.contentPreview}>
              {feed.content}
            </Text>
            <Text style={{color: '#a7a7a7', fontSize: 13}}>... 더 보기</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              navigation ? navigation.navigate('댓글', {board: feed}) : null
            }>
            <Text style={styles.contentPreview}>{feed.content}</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={styles.commentSummary}
        onPress={() =>
          navigation ? navigation.navigate('댓글', {board: feed}) : null
        }>
        <View style={styles.commentPreview}>
          <Text
            style={{
              ...styles.feedTextStyle,
              fontWeight: '600',
              marginRight: 8,
            }}>
            {feed.commentPreview.nickname}
          </Text>
          <Text
            numberOfLines={1}
            style={{...styles.feedTextStyle, width: '60%', overflow: 'hidden'}}>
            {feed.commentPreview.comment}
          </Text>
        </View>
        <Text style={{...styles.feedTextStyle, color: '#a7a7a7'}}>
          댓글 {feed.commentNum}개 모두 보기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopWidth: 0.2,
    borderColor: 'black',
    paddingVertical: 3,
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
    marginHorizontal: 10,
  },
  contentPreview: {
    color: 'black',
    fontSize: 14,
    lineHeight: 16,
  },
  viewFullContent: {
    padding: 1,
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

export default HomeFeed;
