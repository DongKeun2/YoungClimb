/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import UserAvatar from './UserAvatar';

import avatar from '../assets/image/initial/background.png';
import MenuIcon from '../assets/image/feed/menuIcon.svg';
import CameraIcon from '../assets/image/feed/whiteCamera.svg';
import EmptyHeart from '../assets/image/feed/emptyHeart.svg';
import FillHeart from '../assets/image/feed/fillHeart.svg';
import EmptyScrap from '../assets/image/feed/emptyScrap.svg';
import FillScrap from '../assets/image/feed/fillScrap.svg';
import EyeIcon from '../assets/image/feed/eye.svg';

function HomeFeed({navigation}) {
  const feed = {
    id: 1,
    createUser: 'climb_june',
    createdAt: '2시간 전',
    centerName: '더 클라임 양재점',
    centerLevelColor: '파랑 Lv.',
    mediaId: null,
    wallName: 'A구역',
    difficulty: 'V3',
    holdColor: '파랑 홀드',
    solvedDate: '2022.10.21',
    content: '대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다. 모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을 박탈당하지 아니한다. 모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다. 타인의 범죄행위로 인하여 생명·신체에 대한 피해를 받은 국민은 법률이 정하는 바에 의하여 국가로부터 구조를 받을 수 있다.',
    like: 96,
    view: 316,
    isFollow: true,
    isLiked: true,
    isScrap: false,
    commentNum: 2753,
    commentPreview: {nickname: '아그작냠냠', comment: '개쩌네... 어떻게 했냐'},
  };
  return (
    <View style={styles.container}>
      {/* 피드 상단 헤더 */}
      <View style={styles.feedHeader}>
        <View style={styles.headerTop}>
          <View style={styles.iconText}>
            <UserAvatar source={avatar} rank={1} size={36} />
            <View style={styles.headerTextGroup}>
              <Text style={{...styles.feedTextStyle, fontSize: 16}}>{feed.createUser}</Text>
              <Text style={{...styles.feedTextStyle, fontSize: 12}}>{feed.createdAt}</Text>
            </View>
          </View>
          <MenuIcon width={16} height={16} />
        </View>
        <View style={styles.wallInfo}>
          <Text style={{...styles.feedTextStyle, marginRight: 8}}>{feed.centerName}</Text>
          <Text style={{...styles.feedTextStyle, marginRight: 8}}>{feed.wallName}</Text>
          <Text style={{...styles.feedTextStyle, marginRight: 8}}>{feed.difficulty}</Text>
          <Text style={{...styles.feedTextStyle, marginRight: 8}}>{feed.centerLevelColor}</Text>
          <Text style={styles.feedTextStyle}>{feed.holdColor}</Text>
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
          <Text style={{color: 'white', fontSize: 12, marginLeft: 3, marginTop: 1}}>{feed.solvedDate}</Text>
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
            <Text style={styles.feedTextStyle}>{feed.like} 명이 좋아합니다.</Text>
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
          <Text style={styles.feedTextStyle}>{feed.view} 명이 감상했습니다.</Text>
        </View>
      </View>
      {/* 본문 */}
      <View style={styles.contentSummary}>
        <Text style={styles.contentPreview}>{feed.content}</Text>
      </View>
      {/* 댓글 미리보기, 댓글 수 */}
      <TouchableOpacity
        style={styles.commentSummary}
        onPress={() => (navigation ? navigation.navigate('댓글', {id: feed.id}) : null)}>
        <View style={styles.commentPreview}>
          <Text style={{...styles.feedTextStyle, fontWeight: '700', marginRight: 10}}>{feed.commentPreview.nickname}</Text>
          <Text style={styles.feedTextStyle}>{feed.commentPreview.comment}</Text>
        </View>
        <Text style={{...styles.feedTextStyle, color: '#a7a7a7'}}>댓글 {feed.commentNum}개 모두 보기</Text>
      </TouchableOpacity>
    </View>
  );
}

HomeFeed.defaultProps = {
  navigation: null,
};

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

export default HomeFeed;
