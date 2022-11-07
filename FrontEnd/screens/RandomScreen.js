import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import {Toast} from '../components/Toast';

import ReelsList from '../components/ReelsList';

function RandomScreen() {
  const [exitAttempt, setExitAttempt] = useState(false);
  const toastRef = useRef(null);
  const onPressExit = useCallback(() => {
    toastRef.current.show('앱을 종료하려면 뒤로가기를 한번 더 눌러주세요');
  }, []);

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

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  });


  const PAGES = [
    {
      num: 1,
      color: '#86E3CE',
    },
    {
      num: 2,
      color: '#D0E6A5',
    },
    {
      num: 3,
      color: '#FFDD94',
    },
    {
      num: 4,
      color: '#FA897B',
    },
    {
      num: 5,
      color: '#CCABD8',
    },
  ];

  return (
    <>
      <ReelsList reels={PAGES} />
      <Toast ref={toastRef} />
    </>
  );
}

export default RandomScreen;
