import React, {useState, useRef, useCallback, useEffect} from 'react';
import {View, Text, Button, BackHandler} from 'react-native';
import CustomMainHeader from '../components/CustomMainHeader';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Toast } from '../components/Toast';

function SearchScreen({navigation}) {
  const [exitAttempt, setExitAttempt] = useState(false)
  const routeName = useRoute()
  const toastRef = useRef(null);
  const onPressExit = useCallback(()=>{
      toastRef.current.show("앱을 종료하려면 뒤로가기를 한번 더 눌러주세요");
  }, []);

  const backAction = ()=>{ 
    if (routeName.name !== '검색'){
      navigation.goBack()
      return true
    } else{
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
      <CustomMainHeader type="검색" />
      <View>
        <Text>Search!</Text>
        <Button title="검색" onPress={() => navigation.navigate('검색 결과')} />
      </View>
      <Toast ref={toastRef}/>
    </>
  );
}

export default SearchScreen;
