import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {BackHandler} from 'react-native';
import {Toast} from '../components/Toast';

import ReelsList from '../components/ReelsList';

import {fetchReels} from '../utils/slices/PostSlice';

function RandomScreen({navigation}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [exitAttempt, setExitAttempt] = useState(false);
  const toastRef = useRef(null);
  const onPressExit = useCallback(() => {
    toastRef.current.show('앱을 종료하려면 뒤로가기를 한번 더 눌러주세요');
  }, []);

  const reels = useSelector(state => state.post.reels.boardDtos);

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
    dispatch(fetchReels(1));
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
    <>
      <ReelsList reels={reels} navigation={navigation} />
      <Toast ref={toastRef} />
    </>
  );
}

export default RandomScreen;
