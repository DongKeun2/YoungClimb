/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {
  FlatList,
  BackHandler,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import CustomMainHeader from '../../components/CustomMainHeader';
import HomeFeed from '../../components/HomeFeed';

import {Toast} from '../../components/Toast';
import DeclareSheet from '../../components/DeclareSheet';

import {fetchHomeFeed, fetchHomeFeedAdd} from '../../utils/slices/PostSlice';

function HomeScreen({navigation, route}) {
  const dispatch = useDispatch();
  const [visablePostIndex, setVisablePostIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [focusedContent, setFocusedContent] = useState(null);
  const [closeSignal, setCloseSignal] = useState(0);

  const pageRef = useRef(0);
  const pageAddRef = useRef(0);
  const boardNumRef = useRef(0);
  const [isLoading, setIsLoading] = useState(false);

  const isNext = useSelector(state => state.post.isNext);
  const isFinish = useSelector(state => state.post.isFinish);

  const fetchFeeds = () => {
    if (boardNumRef.current > 3 || !isFinish) {
      boardNumRef.current = 0;
      setIsLoading(false);
      return;
    }
    if (!isLoading && isFinish) {
      if (isNext) {
        // 게시물 요청
        setIsLoading(true);
        dispatch(fetchHomeFeed(pageRef.current)).then(res => {
          if (res.type === 'fetchHomeFeed/fulfilled') {
            pageRef.current = pageRef.current + 1;
            if (boardNumRef.current + res.payload.boardDtos.length > 3) {
              boardNumRef.current = 0;
              setIsLoading(false);
              return;
            } else {
              boardNumRef.current =
                boardNumRef.current + res.payload.boardDtos.length;
              if (res.payload.nextPage) {
                return fetchFeeds();
              } else {
                boardNumRef.current = 0;
                setIsLoading(false);
                return;
              }
            }
          } else {
            return;
          }
        });
      } else {
        // 추가게시물 요청
        setIsLoading(true);
        dispatch(fetchHomeFeedAdd(pageAddRef.current)).then(res => {
          if (res.type === 'fetchHomeFeedAdd/fulfilled') {
            pageAddRef.current = pageAddRef.current + 1;
            if (boardNumRef.current + res.payload.boardDtos.length > 3) {
              boardNumRef.current = 0;
              setIsLoading(false);
              return;
            } else {
              boardNumRef.current =
                boardNumRef.current + res.payload.boardDtos.length;
              if (res.payload.nextPage) {
                return fetchFeeds();
              } else {
                boardNumRef.current = 0;
                setIsLoading(false);
                return;
              }
            }
          } else {
            return;
          }
        });
      }
    }
  };

  const boards = useSelector(state => state.post.boardArray);

  const onViewRef = useRef(({viewableItems}) => {
    if (viewableItems && viewableItems[0]) {
      const index = viewableItems[0].index;
      if (typeof index === 'number') {
        setVisablePostIndex(index);
      }
    } else {
      setVisablePostIndex(-1);
    }
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const [exitAttempt, setExitAttempt] = useState(false);
  const routeName = useRoute();
  const toastRef = useRef(null);
  const onPressExit = useCallback(() => {
    toastRef.current.show('앱을 종료하려면 뒤로가기를 한번 더 눌러주세요');
  }, []);

  const backAction = () => {
    if (routeName.name !== '홈') {
      navigation.goBack();
      return true;
    } else {
      if (!exitAttempt) {
        setExitAttempt(true);
        setTimeout(() => {
          setExitAttempt(false);
        }, 2000);
        onPressExit();
        return true;
      } else {
        BackHandler.exitApp();
        return true;
      }
    }
  };

  useEffect(() => {
    fetchFeeds();
    let isBackHandler = true;
    if (isBackHandler) {
      BackHandler.removeEventListener('hardwareBackPress');
    }
    return () => {
      isBackHandler = false;
    };
  }, []);

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  });

  return (
    <View style={{height: '100%', position: 'relative'}}>
      <CustomMainHeader type="홈" navigation={navigation} />
      <FlatList
        data={boards}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        keyExtractor={(item, index) => `${index}`}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={7}
        removeClippedSubviews={true}
        renderItem={({item, index}) => (
          <HomeFeed
            feed={item}
            isRecommend={false}
            navigation={navigation}
            isViewable={index === visablePostIndex}
            setModalVisible={setModalVisible}
            setFocusedContent={setFocusedContent}
          />
        )}
        onEndReached={isFinish ? fetchFeeds : null}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          isLoading ? (
            <View
              style={{
                width: '100%',
                paddingVertical: 15,
                backgroundColor: 'white',
              }}>
              <ActivityIndicator size="large" color="#F34D7F" />
            </View>
          ) : null
        }
      />
      <Toast ref={toastRef} />
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
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 2,
  },
});
