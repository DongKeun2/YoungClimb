import React, {useRef, useEffect} from 'react';
import {ImageBackground, Animated, View, Text} from 'react-native';
import background from '../assets/image/initial/background.png';

function InitialScreen() {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // const fadeIn = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // fadeIn();
    setTimeout(() => {
      fadeOut();
    }, 2000);
  });

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}>
      <ImageBackground
        source={background}
        style={{width: '100%', height: '100%'}}>
        <></>
      </ImageBackground>
    </Animated.View>
  );
}

export default InitialScreen;
