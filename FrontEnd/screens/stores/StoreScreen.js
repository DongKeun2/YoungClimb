import React from 'react';
import { useState, useEffect, useRef } from 'react'
import {View, Text, Button, Animated, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import BottomSheet from '../../components/BottomSheet';
import NaverMapView, {Circle, Marker, Align} from "react-native-nmap";
import Geolocation from 'react-native-geolocation-service';

import MyLocationImg from '../../assets/image/map/MyLocation.png'
import MarkerImg from '../../assets/image/map/Marker.png'

export default function StoreScreen({navigation}) {
  const [currentLocation, setCurrentLocation] = useState({latitude: 37.587336576003295, longitude: 127.0575764763725});
  const [modalVisible, setModalVisible] = useState(false)
  const [mapView, setMapView] = useState('55%')
  const locationHandler = (e) => {
    console.log(JSON.stringify(e))
    setCurrentLocation(e);
  }
  const [climbingLocations, setClimbingLocations] = useState([
    {id:'A125098234',
    name: '더클라임 강남',
    address: '서울 강남구 테헤란로8길 21 화인강남빌딩 B1층',
    distance: '300m',
    latitude: 37.49622174266254, longitude: 127.03029194140458
    }, 
    {id:'A125098235',
    name: '손상원클라임 강남',
    address: '서울 강남구 테헤란로8길 21 화인강남빌딩 B1층',
    distance: '700m',
    latitude: 37.49552290450269, longitude: 127.0282506964424
    },
    {id:'A125098235',
    name: '손상원클라임 강남',
    address: '서울 강남구 테헤란로8길 21 화인강남빌딩 B1층',
    distance: '700m',
    latitude: 37.49552290450269, longitude: 127.0282506964424
    },
    {id:'A125098235',
    name: '손상원클라임 강남',
    address: '서울 강남구 테헤란로8길 21 화인강남빌딩 B1층',
    distance: '700m',
    latitude: 37.49552290450269, longitude: 127.0282506964424
    },
    {id:'A125098235',
    name: '손상원클라임 강남',
    address: '서울 강남구 테헤란로8길 21 화인강남빌딩 B1층',
    distance: '700m',
    latitude: 37.49552290450269, longitude: 127.0282506964424
    },
    {id:'A125098235',
    name: '손상원클라임 강남',
    address: '서울 강남구 테헤란로8길 21 화인강남빌딩 B1층',
    distance: '700m',
    latitude: 37.49552290450269, longitude: 127.0282506964424
    },
    {id:'A125098235',
    name: '손상원클라임 강남',
    address: '서울 강남구 테헤란로8길 21 화인강남빌딩 B1층',
    distance: '700m',
    latitude: 37.49552290450269, longitude: 127.0282506964424
    },
    {id:'A125098235',
    name: '손상원클라임 강남',
    address: '서울 강남구 테헤란로8길 21 화인강남빌딩 B1층',
    distance: '700m',
    latitude: 37.49552290450269, longitude: 127.0282506964424
    },
    {id:'A125098235',
    name: '손상원클라임 강남',
    address: '서울 강남구 테헤란로8길 21 화인강남빌딩 B1층',
    distance: '700m',
    latitude: 37.49552290450269, longitude: 127.0282506964424
    },])
    

  useEffect(()=>{
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude,longitude})
      },
      error => {
        setCurrentLocation({latitude: 37.587336576003295, longitude: 127.0575764763725})
        console.error(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    }
  ,[])

  useEffect(()=>{
    console.log(currentLocation)
  },[currentLocation])

  return (
    // <View>
    //   <Text>Store!</Text>
    // </View>
    <View style={{height:'100%'}}>
      <Animated.View style={{position:'absolute', top:0, left:0,width:'100%', height:'100%', zIndex:0 }}>
        <NaverMapView style={{width: '100%', height: '100%'}}
          onMapClick={e => locationHandler(e)}
          center={{...currentLocation, zoom: 14}}
          zoomControl ={true}
          showsMyLocationButton={true}
          onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
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
        <TouchableOpacity style={{...styles.button, position:'absolute', bottom:5, left:'50%', transform:[{ translateX: -50 }]}} onPress={()=>{setModalVisible(true)}}>
          <Text style={styles.text}>지점 리스트</Text>
        </TouchableOpacity>

      }
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
    width: 100,
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
  }
})




