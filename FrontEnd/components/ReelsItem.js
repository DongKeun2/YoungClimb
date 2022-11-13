/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

import UserAvatar from './UserAvatar';
import HoldLabel from './HoldLabel';
import LevelLabel from './LevelLabel';

import avatar from '../assets/image/initial/background.png';
import HoldIcon from '../assets/image/hold/hold.svg';
import WhiteScrap from '../assets/image/reels/whiteScrap.svg';
import FillScrap from '../assets/image/feed/fillScrap.svg';
import WhiteHeart from '../assets/image/reels/whiteHeart.svg';
import FillHeart from '../assets/image/feed/fillHeart.svg';
import CommentIcon from '../assets/image/reels/commentIcon.svg';

import {YCLevelColorDict} from '../assets/info/ColorInfo';

import {feedLikeSubmit, feedScrapSubmit} from '../utils/slices/PostSlice';

function ReelsItem({item, navigation, isViewable, viewHeight}) {
  const dispatch = useDispatch();

  const bottomTabBarHeight = useBottomTabBarHeight();
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likePress, setLikePress] = useState(false);
  const [isScrap, setIsScrap] = useState(false);
  const [scrapPress, setScrapPress] = useState(false);

  const changeMuted = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    setIsLiked(item.isLiked);
    setIsScrap(item.isScrap);
  }, [item.isLiked, item.isScrap]);

  useFocusEffect(
    React.useCallback(() => {
      return () => setIsMuted(true);
    }, []),
  );

  const reelsLike = id => {
    setLikePress(true);
    dispatch(feedLikeSubmit(id))
      .then(() => {
        setIsLiked(!isLiked);
        setLikePress(false);
      })
      .catch(() => setLikePress(false));
  };

  const reelsScrap = id => {
    console.log('눌림');
    setScrapPress(true);
    dispatch(feedScrapSubmit(id))
      .then(() => {
        setIsScrap(!isScrap);
        setScrapPress(false);
      })
      .catch(() => setScrapPress(false));
  };

  return (
    <View
      style={{
        ...styles.container,
        height: viewHeight - bottomTabBarHeight,
      }}>
      {/* 릴스 게시물 정보 */}
      <View style={styles.reelsInfo}>
        <View style={styles.userGroup}>
          <View style={styles.iconText}>
            <UserAvatar source={avatar} size={36} />
            <View style={{...styles.iconText, marginLeft: 8, marginBottom: 2}}>
              <Text
                style={{
                  ...styles.reelsTextStyle,
                  fontSize: 16,
                  fontWeight: '600',
                  marginRight: 5,
                }}>
                {item.createUser.nickname}
              </Text>
              <HoldIcon
                width={18}
                height={18}
                color={YCLevelColorDict[item.createUser.rank]}
              />
            </View>
          </View>
        </View>
        <View style={styles.wallInfo}>
          <Text style={{...styles.reelsTextStyle, marginRight: 8}}>
            {item.centerName}
          </Text>
          {item.wallName ? (
            <Text style={{...styles.reelsTextStyle, marginRight: 8}}>
              {item.wallName}
            </Text>
          ) : null}
          <Text style={{...styles.reelsTextStyle, marginRight: 3}}>
            {item.difficulty}
          </Text>
          <LevelLabel color={item.centerLevelColor} />
          <HoldLabel color={item.holdColor} />
        </View>
      </View>
      {/* 비디오 */}
      <View
        style={{
          width: Dimensions.get('window').width,
          height: viewHeight - bottomTabBarHeight,
        }}>
        <TouchableOpacity
          style={styles.videoBox}
          activeOpacity={1}
          onPress={changeMuted}>
          <Video
            source={{uri: item.mediaPath}}
            style={styles.backgroundVideo}
            fullscreen={false}
            resizeMode={'contain'}
            repeat={true}
            controls={false}
            paused={!isViewable}
            muted={isMuted}
          />
        </TouchableOpacity>
      </View>
      {/* 아이콘 그룹 */}
      <View style={styles.likeGroup}>
        <TouchableOpacity
          onPress={() => reelsLike(item.id)}
          disabled={likePress}>
          {isLiked ? (
            <FillHeart width={28} height={28} style={{marginBottom: 10}} />
          ) : (
            <WhiteHeart width={28} height={28} style={{marginBottom: 10}} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => reelsScrap(item.id)}
          disabled={scrapPress}>
          {isScrap ? (
            <FillScrap
              width={30}
              height={30}
              style={{marginBottom: 12, marginLeft: -0.8}}
            />
          ) : (
            <WhiteScrap width={28} height={28} style={{marginBottom: 12}} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => null}>
          <CommentIcon width={26} height={24} style={{marginLeft: 0.5}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
  },
  reelsInfo: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    zIndex: 3,
  },
  userGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  reelsTextStyle: {
    color: 'white',
    fontSize: 14,
  },
  wallInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
  },
  videoBox: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  likeGroup: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 10,
    zIndex: 3,
  },
});

export default ReelsItem;
