import React from 'react';
import { useState, useEffect, useRef } from 'react'
import {View, Text, Button, Animated, Dimensions, StyleSheet} from 'react-native';
import BottomSheet from '../components/BottomSheet';
import NaverMapView, {Circle, Marker} from "react-native-nmap";

function StoreScreen() {
  const [currentLocation, setCurrentLocation] = useState({latitude: 37.587336576003295, longitude: 127.0575764763725});
  const [modalVisible, setModalVisible] = useState(true)
  const [mapView, setMapView] = useState('55%')
  const locationHandler = (e) => {
    console.log(JSON.stringify(e))
    setCurrentLocation(e);
  }
  useEffect(()=>{
    setModalVisible(true)
  },[])

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
                            //  showsMyLocationButton={true}
                            onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                            >
            {/* 
            받은 정보 map        
            <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')}/> */}
            <Marker coordinate={currentLocation} pinColor="#C16918"/>
            <Circle coordinate={currentLocation} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')}/>
        </NaverMapView>
      </Animated.View>
      <BottomSheet
        style={{...styles.bottomView,zIndex:0}}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setMapView={setMapView}
      />
      <Button onPress={()=>{setModalVisible(true)}} title='open'/>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomView: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default StoreScreen;


