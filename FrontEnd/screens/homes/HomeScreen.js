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
import DetailLoading from '../../components/Loading/DetailLoading';

import {Toast} from '../../components/Toast';
import DeclareSheet from '../../components/DeclareSheet';

import {
  changeBoardArray,
  fetchHomeFeed,
  fetchHomeFeedAdd,
} from '../../utils/slices/PostSlice';

function HomeScreen({navigation, route}) {
  const dispatch = useDispatch();
  const [visablePostIndex, setVisablePostIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [focusedContent, setFocusedContent] = useState(null);
  const [closeSignal, setCloseSignal] = useState(0);

  const [isRendering, setIsRendering] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const getRefreshData = async () => {
    setRefreshing(true);
    pageRef.current = 0;
    pageAddRef.current = 0;
    boardNumRef.current = 0;
    nextRef.current = true;
    finishRef.current = true;
    await fetchFeeds();
    setRefreshing(false);
  };

  const onRefresh = () => {
    if (!refreshing) {
      setIsRendering(true);
      dispatch(changeBoardArray([]));
      getRefreshData();
    }
  };

  const pageRef = useRef(0);
  const pageAddRef = useRef(0);
  const boardNumRef = useRef(0);
  const nextRef = useRef(true);
  const finishRef = useRef(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFeeds = () => {
    if (boardNumRef.current > 3 || !finishRef.current) {
      boardNumRef.current = 0;
      setIsRendering(false);
      setIsLoading(false);
      return;
    }
    if (!isLoading && finishRef.current) {
      if (nextRef.current) {
        // 게시물 요청
        setIsLoading(true);
        dispatch(fetchHomeFeed(pageRef.current)).then(res => {
          if (res.type === 'fetchHomeFeed/fulfilled') {
            nextRef.current = res.payload.nextPage;
            pageRef.current = pageRef.current + 1;
            if (boardNumRef.current + res.payload.boardDtos.length > 3) {
              boardNumRef.current = 0;
              setIsRendering(false);
              setIsLoading(false);
              return;
            } else {
              boardNumRef.current =
                boardNumRef.current + res.payload.boardDtos.length;
              if (nextRef.current) {
                return fetchFeeds();
              } else {
                boardNumRef.current = 0;
                setIsRendering(false);
                setIsLoading(false);
                return fetchFeeds();
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
            finishRef.current = res.payload.nextPage;
            pageAddRef.current = pageAddRef.current + 1;
            if (boardNumRef.current + res.payload.boardDtos.length > 3) {
              boardNumRef.current = 0;
              setIsRendering(false);
              setIsLoading(false);
              return;
            } else {
              boardNumRef.current =
                boardNumRef.current + res.payload.boardDtos.length;
              if (res.payload.nextPage) {
                return fetchFeeds();
              } else {
                boardNumRef.current = 0;
                setIsRendering(false);
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
      {isRendering ? (
        <View style={{height: '100%', backgroundColor: 'white'}}>
          <DetailLoading />
          <DetailLoading />
        </View>
      ) : (
        <>
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
            onEndReached={finishRef.current ? fetchFeeds : null}
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
            onRefresh={onRefresh}
            refreshing={refreshing}
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
        </>
      )}
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
