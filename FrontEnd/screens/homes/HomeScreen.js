/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useFocusEffect, useRoute, useIsFocused} from '@react-navigation/native';
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
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [visablePostIndex, setVisablePostIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [focusedContent, setFocusedContent] = useState(null);
  const [closeSignal, setCloseSignal] = useState(0);

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const isNext = useSelector(state => state.post.isNext);

  const onEndReached = () => {
    if (!isLoading && !isFinished) {
      if (isNext) {
        setIsLoading(true);
        setPage(page + 1);
        dispatch(fetchHomeFeed(page)).then(res => {
          if (res.payload.nextPage && res.payload.boardDtos.length < 3) {
            setPage(page + 1);
            dispatch(fetchHomeFeed(page)).then(res => {
              if (res.type === 'fetchHomeFeed/fulfilled') {
                if (!res.payload.nextPage) {
                  setPage(-1);
                }
                setIsLoading(false);
              }
            });
          } else if (res.type === 'fetchHomeFeed/fulfilled') {
            if (!res.payload.nextPage) {
              setPage(-1);
            }
            setIsLoading(false);
          }
        });
      } else {
        setIsLoading(true);
        setPage(page + 1);
        console.log(page, '추가');
        dispatch(fetchHomeFeedAdd(page)).then(res => {
          if (!res.payload.nextPage) {
            setIsFinished(true);
          }
          if (res.payload.nextPage && res.payload.boardDtos.length < 3) {
            setPage(page + 1);
            dispatch(fetchHomeFeedAdd(page)).then(res => {
              if (res.type === 'fetchHomeFeedAdd/fulfilled') {
                setIsLoading(false);
              }
            });
          } else if (res.type === 'fetchHomeFeedAdd/fulfilled') {
            setIsLoading(false);
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
    let isBackHandler = true;
    if (isBackHandler) {
      BackHandler.removeEventListener('hardwareBackPress');
    }
    return () => {
      isBackHandler = false;
    };
  }, []);

  useEffect(() => {
    console.log('홈피드 접근');
    dispatch(fetchHomeFeed(page));
  }, [isFocused]);

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
        initialNumToRender={3}
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
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          isLoading && (
            <View
              style={{
                width: '100%',
                paddingVertical: 15,
                backgroundColor: 'white',
              }}>
              <ActivityIndicator size="large" color="#F34D7F" />
            </View>
          )
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
