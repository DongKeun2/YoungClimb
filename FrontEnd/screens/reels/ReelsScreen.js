import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  Dimensions,
  StatusBar,
  View,
  FlatList,
  StyleSheet,
  BackHandler,
} from 'react-native';

import {Toast} from '../../components/Toast';
import ReelsItem from '../../components/ReelsItem';

import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {fetchReels} from '../../utils/slices/PostSlice';

function RandomScreen({navigation}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [exitAttempt, setExitAttempt] = useState(false);
  const toastRef = useRef(null);
  const onPressExit = useCallback(() => {
    toastRef.current.show('앱을 종료하려면 뒤로가기를 한번 더 눌러주세요');
  }, []);

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onEndReached = () => {
    if (!isLoading) {
      setIsLoading(true);
      setPage(page + 1);
      dispatch(fetchReels(page)).then(res => {
        if (res.payload.nextPage && res.payload.boardDtos.length < 3) {
          setPage(page + 1);
          dispatch(fetchReels(page)).then(res => {
            if (res.type === 'fetchReels/fulfilled') {
              setIsLoading(false);
            }
          });
        } else if (res.type === 'fetchReels/fulfilled') {
          setIsLoading(false);
        }
      });
    }
  };

  const reels = useSelector(state => state.post.reelsArray);

  const backAction = () => {
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
    dispatch(fetchReels(page));
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

  const viewHeight =
    Dimensions.get('screen').height - Dimensions.get('window').height > 60
      ? Dimensions.get('window').height
      : Dimensions.get('window').height - StatusBar.currentHeight;
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [visablePostIndex, setVisablePostIndex] = useState(0);

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

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={reels}
          decelerationRate="fast"
          disableIntervalMomentum
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          keyExtractor={(item, index) => `${index}`}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
          renderItem={({item, index}) => (
            <ReelsItem
              item={item}
              navigation={navigation}
              isViewable={index === visablePostIndex}
              viewHeight={viewHeight}
            />
          )}
          snapToInterval={viewHeight - bottomTabBarHeight}
          snapToAlignment="start"
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Toast ref={toastRef} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RandomScreen;
