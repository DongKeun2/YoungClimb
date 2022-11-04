import React, {useState, useRef, useCallback, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {View, Text, BackHandler} from 'react-native';
import { Toast } from '../components/Toast';

function RandomScreen() {
  const [exitAttempt, setExitAttempt] = useState(false)
  const toastRef = useRef(null);
  const onPressExit = useCallback(()=>{
      toastRef.current.show("앱을 종료하려면 뒤로가기를 한번 더 눌러주세요");
  }, []);

  const backAction = ()=>{ 
    if (!exitAttempt){
        setExitAttempt(true)
        setTimeout(()=>{setExitAttempt(false)}, 2000)
        onPressExit()
        return true
      } else{
        BackHandler.exitApp()
        return true
      }
    }

  useEffect(()=>{
    let isBackHandler = true
    if (isBackHandler){
      BackHandler.removeEventListener('hardwareBackPress')
    }
    return ()=>{ isBackHandler=false }
  },[]
  )
  
  useFocusEffect(()=>{
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );
  return ()=> {
    backHandler.remove()
  }
   })
  return (
    <>
      <Text>Random!</Text>
      <Toast ref={toastRef}/>
    </>
  );
}

export default RandomScreen;
