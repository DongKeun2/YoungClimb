import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react'
import {View, Text, Animated, StyleSheet, TouchableOpacity, BackHandler, Alert} from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import BottomSheet from '../../components/BottomSheet';
import NaverMapView, {Marker, Align} from "react-native-nmap";
import Geolocation from 'react-native-geolocation-service';

import MyLocationImg from '../../assets/image/map/MyLocation.png'
import MarkerImg from '../../assets/image/map/Marker.png'

import axios from 'axios'
import api from '../../utils/api'
import { Toast } from '../../components/Toast';

export default function StoreScreen({navigation, route}) {
  const [currentLocation, setCurrentLocation] = useState({latitude: 37.0575, longitude: 127.0575});
  const [modalVisible, setModalVisible] = useState(false)
  const [mapView, setMapView] = useState('55%')
  const [exitAttempt, setExitAttempt] = useState(false) 
  const locationHandler = (e) => {
    setCurrentLocation(e);
  }
  const [climbingLocations, setClimbingLocations] = useState([])
  const routeName = useRoute()
  const toastRef = useRef(null);
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
    console.log(api.centers())
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude,longitude})
      },
      error => {
        setCurrentLocation({latitude: 37.5873, longitude: 127.0575})
        console.error(error.code, error.message,10);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
  ,[])

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
    axios.post(api.centers(), 
      {'lat':currentLocation.latitude,
       'lon':currentLocation.longitude}
    )
    .then((res)=>{
        console.log(res)
        setClimbingLocations(res.data)
      })
    .catch((err)=>{
      console.log(err.message,'err')
    })

  },[currentLocation])

  return (
    <View style={{height:'100%'}}>
      <Animated.View style={{position:'absolute', top:0, left:0,width:'100%', height:'100%', zIndex:0 }}>
        <NaverMapView style={{width: '100%', height: '100%'}}
          onMapClick={e => locationHandler(e)}
          center={{...currentLocation, zoom: 14}}
          zoomControl ={true}
          // showsMyLocationButton={true}
          // onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
          >
            {/* 
            받은 정보 map        
            <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')}/> */}
            {climbingLocations.map((center, idx)=>{
              return(
                <Marker coordinate={{latitude:center.latitude, longitude:center.longitude}} key={center.id} caption={{text:center.name, align:Align.Top}}/>
              )
            })}
            <Marker coordinate={currentLocation} image={MyLocationImg}/>
        </NaverMapView>
      </Animated.View> 
        <BottomSheet
        navigation = {navigation}
        style={{...styles.bottomView,zIndex:10}}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setMapView={setMapView}
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
            elevation: 0,
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




