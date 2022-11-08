import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react'
import {View, Text, Animated, StyleSheet, TouchableOpacity, Easing, BackHandler, Alert} from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import BottomSheet from '../../components/BottomSheet';
import NaverMapView, {Marker, Align} from "react-native-nmap";
import Geolocation from 'react-native-geolocation-service';

import MyLocationImg from '../../assets/image/map/MyLocation.png'
import MarkerImg from '../../assets/image/map/Marker.png'
import Refresh from '../../assets/image/map/Refresh.svg'

import axios from 'axios'
import api from '../../utils/api'
import { Toast } from '../../components/Toast';

export default function StoreScreen({navigation, route}) {
  const [currentLocation, setCurrentLocation] = useState({latitude: 37.0575, longitude: 127.0575});
  const [currentCenter, setCurrentCenter] = useState({latitude: 37.0575, longitude: 127.0575})
  const [zoom, setZoom] = useState(14)
  const [currentZoom, setCurrentZoom] = useState(14)
  const [modalVisible, setModalVisible] = useState(false)
  const [exitAttempt, setExitAttempt] = useState(false) 
  const [rerender, setRerender] = useState(1)
  const locationHandler = (e) => {
    setCurrentCenter(e);
  }
  const [climbingLocations, setClimbingLocations] = useState([])
  const routeName = useRoute()
  const toastRef = useRef(null);
  const spinValue = useRef(new Animated.Value(0)).current
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  const onPressExit = useCallback(()=>{
      toastRef.current.show("앱을 종료하려면 뒤로가기를 한번 더 눌러주세요");
  }, []);
  
  const backAction = ()=>{
    if (routeName.name === '지점메인') {
      if (modalVisible){
        setModalVisible(false)
        return true
      } 
      else{
        if (!exitAttempt){
          setExitAttempt(true)
          setTimeout(()=>{setExitAttempt(false)},2000)
          onPressExit()
          return true
        } else{
          BackHandler.exitApp()
          return true
      }}
    }
    return false
  }

  useEffect(()=>{
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude,longitude})
        setCurrentCenter({latitude,longitude})
      },
      error => {
        setCurrentLocation({latitude: 37.5873, longitude: 127.0575})
        setCurrentCenter({latitude: 37.5873, longitude: 127.0575})
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
  ,[rerender])

  useFocusEffect(()=>{
  
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );
  return ()=> {
    backHandler.remove()
  }
   })

  useEffect(()=>{
    const source = axios.CancelToken.source();
    axios.post(api.centers(), 
      {'lat':currentLocation.latitude,
       'lon':currentLocation.longitude},
      {cancelToken: source.token}
    )
    .then((res)=>{
        setClimbingLocations(res.data)
        setTimeout(()=>spinValue.setValue(0), 600)
      })
    .catch((err)=>{
      console.log(err.message,'err')
      setTimeout(()=>spinValue.setValue(0), 2000)
    })
  },[currentLocation, rerender])

  const onSearchThisRegion = ()=>{
    setCurrentLocation(currentCenter)
    setCurrentZoom(zoom)
  }

  const onRefresh = () =>{
    setRerender(rerender+1)
    setCurrentZoom(14)
    setZoom(14)
    Animated.loop(
      Animated.timing(
        spinValue,
        {
         toValue: 1,
         duration: 1200,
         easing: Easing.linear,
         useNativeDriver: true
        }
      ), {iterations: 3}
     ).start();
  }

  const setCurrents = (e) => {
    setCurrentCenter({latitude:e.latitude,longitude:e.longitude})
    setZoom(e.zoom)

  }

  return (
    <View style={{height:'100%'}}>
      <TouchableOpacity
        style={{...styles.button, zIndex:0.5, position:'absolute', backgroundColor:'white',top:15, left:'50%', transform:[{ translateX: -55 }]}} 
        onPress={()=>{onSearchThisRegion()}}
      >
        <Text style={{...styles.text, color:'#F34D7F', fontSize:14.5}}>현재 지역 검색</Text>
        </TouchableOpacity>
      
      <TouchableOpacity
        hitSlop={10}
        style={{...styles.button, zIndex:0.5, borderRadius:3, width:30,position:'absolute', backgroundColor:'white',top:15, right:15}} 
        onPress={()=>{onRefresh()}}
      >
        <Animated.View style={{height:'100%', width:'100%',justifyContent:'center', alignItems:'center', transform:[{rotate: spin}]}}>
          <Refresh/>
        </Animated.View>
        </TouchableOpacity>
      
      {/* <TouchableOpacity>refresh</TouchableOpacity> */}
      <Animated.View style={{position:'absolute', top:0, left:0,width:'100%', height:'100%', zIndex:0 }}>
        <NaverMapView style={{width: '100%', height: '100%'}}
          useTextureView={true}
          onMapClick={e => locationHandler(e)}
          center={{...currentLocation, zoom: currentZoom}}
          zoomControl ={true}
          onCameraChange={(e)=>{setCurrents(e)}}
          >
            {/*             받은 정보 map         */}
            {climbingLocations.map((center, idx)=>{
              return(
                <Marker 
                  coordinate={{latitude:center.latitude, longitude:center.longitude}} 
                  key={center.id} 
                  image={MarkerImg} 
                  caption={{text:center.name, align:Align.Top}}
                  onClick={()=> navigation.navigate('지점상세', {Id:center.id})}/>
              )
            })}
            <Marker coordinate={currentLocation} image={MyLocationImg}/>
        </NaverMapView>
      </Animated.View> 
        <BottomSheet
        navigation = {navigation}
        style={{...styles.bottomView,zIndex:1}}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        climbingLocations={climbingLocations}
      />
      {modalVisible?
      <></>
      :
        <TouchableOpacity 
          activeOpacity={1}
          style={{...styles.button, position:'absolute', bottom:15, left:'50%', transform:[{ translateX: -55 }]}} onPress={()=>{setModalVisible(true)}}>
          <Text style={styles.text}>지점 리스트</Text>
        </TouchableOpacity>

      }
      <Toast ref={toastRef}/>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F34D7F',
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 30,
    borderRadius: 15,
    // transform:'translate(-50%, -50%)',
  
    ...Platform.select({
        ios: {
            shadowColor: 'rgba(0,0,0,0.2)',
            shadowOpacity: 1,
            shadowOffset: {height: 2, width: 2},
            shadowRadius: 2,
        },

        android: {
            elevation: 2,
            marginHorizontal: 'auto',
        },
    })
},

  text: {
      fontSize: 15,
      textAlign: 'center',
      color: 'white',
      fontWeight:'bold'
  }
})




