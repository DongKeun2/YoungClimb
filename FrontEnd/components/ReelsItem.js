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
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';

import UserAvatar from './UserAvatar';
import HoldLabel from './HoldLabel';
import LevelLabel from './LevelLabel';

import HoldIcon from '../assets/image/hold/hold.svg';
import WhiteScrap from '../assets/image/reels/whiteScrap.svg';
import FillScrap from '../assets/image/feed/fillScrap.svg';
import WhiteHeart from '../assets/image/reels/whiteHeart.svg';
import FillHeart from '../assets/image/feed/fillHeart.svg';
import CommentIcon from '../assets/image/reels/commentIcon.svg';
import MuteBtn from '../assets/image/videoBtn/muteBtn.svg';
import SoundBtn from '../assets/image/videoBtn/soundBtn.svg';
import RefreshBtn from '../assets/image/videoBtn/refreshBtn.svg';

import {YCLevelColorDict} from '../assets/info/ColorInfo';

import {
  feedLikeSubmit,
  feedScrapSubmit,
  viewCount,
} from '../utils/slices/PostSlice';

function ReelsItem({item, navigation, isViewable, viewHeight}) {
  const dispatch = useDispatch();

  const bottomTabBarHeight = useBottomTabBarHeight();
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likePress, setLikePress] = useState(false);
  const [isScrap, setIsScrap] = useState(false);
  const [scrapPress, setScrapPress] = useState(false);
  const [isBuffer, setIsBuffer] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isCounted, setIsCounted] = useState(false);

  const changeMuted = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    setIsLiked(item.isLiked);
    setIsScrap(item.isScrap);
  }, [item.isLiked, item.isScrap]);

  useEffect(() => {
    setIsFinished(false);
    setIsRepeat(false);
  }, [isViewable]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setIsMuted(true);
        setIsFinished(false);
        setIsRepeat(false);
      };
    }, []),
  );

  const reelsLike = id => {
    setLikePress(true);
    dispatch(feedLikeSubmit(id)).then(res => {
      if (res.type === 'feedLikeSubmit/fulfilled') {
        setIsLiked(!isLiked);
        setLikePress(false);
      } else {
        alert('다시 시도해주세요');
        setLikePress(false);
      }
    });
  };

  const reelsScrap = id => {
    setScrapPress(true);
    dispatch(feedScrapSubmit(id)).then(res => {
      if (res.type === 'feedScrapSubmit/fulfilled') {
        setIsScrap(!isScrap);
        setScrapPress(false);
      } else {
        alert('다시 시도해주세요');
        setScrapPress(false);
      }
    });
  };

  const onLoad = () => {
    setIsRepeat(false);
    setIsBuffer(false);
  };

  const changeFinished = () => {
    setIsFinished(true);
  };

  const resetPlay = () => {
    setIsRepeat(true);
    setIsCounted(false);
  };

  const countView = log => {
    if (log.currentTime / log.seekableDuration > 0.1) {
      setIsCounted(true);
      dispatch(viewCount(item.id));
    }
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
          <TouchableOpacity
            onPress={() => {
              navigation.push('서브프로필', {
                initial: false,
                nickname: item.createUser.nickname,
              });
            }}
            activeOpacity={1}
            style={styles.iconText}>
            <UserAvatar source={{uri: item.createUser.image}} size={36} />
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
          </TouchableOpacity>
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
      <TouchableOpacity
        activeOpacity={1}
        onPress={changeMuted}
        style={{
          width: Dimensions.get('window').width,
          height: viewHeight - bottomTabBarHeight,
        }}>
        <View style={styles.videoBox}>
          <Video
            source={{uri: item.mediaPath}}
            style={styles.backgroundVideo}
            fullscreen={false}
            resizeMode={'contain'}
            repeat={isRepeat}
            controls={false}
            paused={!isViewable}
            muted={isMuted}
            onLoad={() => onLoad()}
            onProgress={res => {
              if (!isCounted) {
                countView(res);
              }
            }}
            onBuffer={() => {
              setIsBuffer(true);
            }}
            onEnd={changeFinished}
          />
        </View>
      </TouchableOpacity>
      {/* 로딩중 */}
      {isViewable && isBuffer ? (
        <View
          style={{
            ...styles.background,
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : null}
      {/* 리셋 버튼 */}
      {isFinished ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={resetPlay}
          style={{
            ...styles.background,
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <RefreshBtn color="white" width={70} height={120} />
        </TouchableOpacity>
      ) : null}
      {/* 아이콘 그룹 */}
      <View style={styles.likeGroup}>
        <TouchableOpacity activeOpacity={1} onPress={changeMuted}>
          {isMuted ? (
            <MuteBtn
              color="white"
              width={28}
              height={28}
              style={{marginBottom: 5, marginHorizontal: 10}}
            />
          ) : (
            <SoundBtn
              color="white"
              width={28}
              height={28}
              style={{marginBottom: 5, marginHorizontal: 10}}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => reelsLike(item.id)}
          disabled={likePress}>
          {isLiked ? (
            <FillHeart
              width={28}
              height={28}
              style={{marginVertical: 5, marginHorizontal: 10}}
            />
          ) : (
            <WhiteHeart
              width={28}
              height={28}
              style={{marginVertical: 5, marginHorizontal: 10}}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => reelsScrap(item.id)}
          disabled={scrapPress}>
          {isScrap ? (
            <FillScrap
              width={28}
              height={28}
              style={{marginVertical: 6, marginHorizontal: 10}}
            />
          ) : (
            <WhiteScrap
              width={28}
              height={28}
              style={{marginVertical: 6, marginHorizontal: 10}}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation ? navigation.navigate('댓글', {boardId: item.id}) : null
          }>
          <CommentIcon
            width={26}
            height={24}
            style={{
              marginLeft: 11,
              marginRight: 10,
              marginTop: 6,
              marginBottom: 10,
            }}
          />
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
    bottom: 10,
    right: 0,
    zIndex: 3,
  },
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 2,
  },
});

export default ReelsItem;
