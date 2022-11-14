import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Video from 'react-native-video';

import UserAvatar from '../../components/UserAvatar';
import HoldLabel from '../../components/HoldLabel';
import LevelLabel from '../../components/LevelLabel';
import CustomSubHeader from '../../components/CustomSubHeader';
import DeclareSheet from '../../components/DeclareSheet';
import Comment from '../../components/Comment';

import {YCLevelColorDict} from '../../assets/info/ColorInfo';
import {fetchDetail, likeBoard, scrapBoard} from '../../utils/slices/PostSlice';

import avatar from '../../assets/image/initial/background.png';
import MenuIcon from '../../assets/image/feed/menuIcon.svg';
import CameraIcon from '../../assets/image/feed/whiteCamera.svg';
import EmptyHeart from '../../assets/image/feed/emptyHeart.svg';
import FillHeart from '../../assets/image/feed/fillHeart.svg';
import EmptyScrap from '../../assets/image/feed/emptyScrap.svg';
import FillScrap from '../../assets/image/feed/fillScrap.svg';
import EyeIcon from '../../assets/image/feed/eye.svg';
import HoldIcon from '../../assets/image/hold/hold.svg';
import CommentInput from '../../components/CommentInput';

function DetailScreen({navigation, route}) {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.accounts.currentUser);

  const [isLoading, setIsLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [focusedContent, setFocusedContent] = useState(null);
  const [closeSignal, setCloseSignal] = useState(0);

  const [videoLength, setVideoLength] = useState(0);

  const [isMuted, setIsMuted] = useState(true);
  const calVideoLength = e => {
    const {width} = e.nativeEvent.layout;
    setVideoLength(width);
  };
  const changeMuted = () => {
    setIsMuted(!isMuted);
  };

  const openMenu = feed => {
    setModalVisible(true);
    setFocusedContent({...feed, isRecommend: false});
  };

  const feed = useSelector(state => state.post.boardInfo);
  const comments = useSelector(state => state.post.commentInfo);

  const isFocused = useIsFocused();
  useEffect(() => {
    setIsLoading(true);
    if (isFocused) {
      dispatch(fetchDetail(route.params.id)).then(() => setIsLoading(false));
    }
  }, [dispatch, route, isFocused]);

  function onClickHeart() {
    dispatch(likeBoard(route.params.id));
  }

  function onClickScrap() {
    dispatch(scrapBoard(route.params.id));
  }

  return (
    <>
      <CustomSubHeader title="게시글" navigation={navigation} />
      <ScrollView
        style={styles.container}
        onLayout={calVideoLength}
        showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <></>
        ) : (
          <>
            <View style={styles.feedHeader}>
              <View style={styles.headerTop}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('서브프로필', {
                      initial: false,
                      nickname: feed.createUser.nickname,
                    });
                  }}
                  style={styles.iconText}>
                  <UserAvatar source={avatar} size={36} />
                  <View style={styles.headerTextGroup}>
                    <View style={{...styles.iconText, alignItems: 'center'}}>
                      <Text
                        style={[
                          styles.feedTextStyle,
                          {
                            fontSize: 16,
                            fontWeight: '600',
                            marginRight: 5,
                          },
                        ]}>
                        {feed.createUser?.nickname}
                      </Text>
                      <HoldIcon
                        width={18}
                        height={18}
                        color={YCLevelColorDict[feed.createUser?.rank]}
                      />
                    </View>
                    <Text style={{...styles.feedTextStyle, fontSize: 12}}>
                      {feed.createdAt}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity hitSlop={10} onPress={() => openMenu(feed)}>
                  <MenuIcon width={16} height={16} />
                </TouchableOpacity>
              </View>
              <View style={styles.wallInfo}>
                <Text style={{...styles.feedTextStyle, marginRight: 8}}>
                  {feed.centerName}
                </Text>
                {feed.wallName ? (
                  <Text style={{...styles.feedTextStyle, marginRight: 8}}>
                    {feed.wallName}
                  </Text>
                ) : null}
                <Text style={{...styles.feedTextStyle, marginRight: 3}}>
                  {feed.difficulty}
                </Text>
                <LevelLabel color={feed.centerLevelColor} />
                <HoldLabel color={feed.holdColor} />
              </View>
            </View>

            <View style={{width: videoLength, height: videoLength}}>
              <TouchableOpacity
                style={styles.videoBox}
                activeOpacity={1}
                onPress={changeMuted}>
                <Video
                  source={{uri: feed.mediaPath}}
                  style={styles.backgroundVideo}
                  fullscreen={false}
                  resizeMode={'contain'}
                  repeat={true}
                  controls={false}
                  paused={false}
                  muted={isMuted}
                />
              </TouchableOpacity>
              <View style={styles.solvedDate}>
                <CameraIcon />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    marginLeft: 3,
                    marginTop: 1,
                  }}>
                  {feed.solvedDate}
                </Text>
              </View>
            </View>

            <View style={styles.popularInfo}>
              <View style={styles.likeGroup}>
                <View style={styles.iconText}>
                  <TouchableOpacity onPress={onClickHeart}>
                    {feed.isLiked ? (
                      <FillHeart style={{marginRight: 5}} />
                    ) : (
                      <EmptyHeart style={{marginRight: 5}} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.feedTextStyle}>
                    {feed.like} 명이 좋아합니다.
                  </Text>
                </View>
                {feed.createUser.nickname === currentUser.nickname ? null : (
                  <TouchableOpacity onPress={onClickScrap}>
                    {feed.isScrap ? (
                      <FillScrap style={{marginRight: 5}} />
                    ) : (
                      <EmptyScrap style={{marginRight: 5}} />
                    )}
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

            <View style={styles.contentSummary}>
              <View style={{position: 'absolute', top: 0, opacity: 0}}>
                <Text style={styles.contentPreview}>{feed.content}</Text>
              </View>
            </View>
            {comments.length ? (
              comments?.map((comment, idx) => {
                return (
                  <Comment
                    key={idx}
                    comment={comment}
                    navigation={navigation}
                  />
                );
              })
            ) : (
              <Text style={styles.text}>댓글이 없습니다.</Text>
            )}
          </>
        )}
      </ScrollView>

      <CommentInput boardId={route.params.id} navigation={navigation} />
      {modalVisible ? (
        <TouchableOpacity
          style={{...styles.background}}
          onPress={() => setCloseSignal(closeSignal + 1)}
        />
      ) : (
        <></>
      )}
      <DeclareSheet
        navigation={navigation}
        route={route}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        focusedContent={focusedContent}
        closeSignal={closeSignal}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 50,
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
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 2,
  },
  text: {color: 'black', marginHorizontal: 10},
});

export default DetailScreen;
