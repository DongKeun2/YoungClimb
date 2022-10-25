import React, { useEffect, useRef, useState } from 'react';
import {
	View,
	StyleSheet,
	Text,
	Modal,
	Animated,
	TouchableWithoutFeedback,
	Dimensions,
	PanResponder
} from 'react-native';

const BottomSheet = (props) => {
	const { modalVisible, setModalVisible, setMapView } = props;
	const screenHeight = Dimensions.get("screen").height;
	const panY = useRef(new Animated.Value(screenHeight)).current;
	const translateY = panY.interpolate({
		inputRange: [-1, 0, 1],
		outputRange: [-0.4, 0, 1],
	});

	const resetBottomSheet = Animated.timing(panY, {
		toValue: 0,
		duration: 300,
		useNativeDriver: true,
	});

	const closeBottomSheet = Animated.timing(panY, {
		toValue: screenHeight,
		duration: 300,
		useNativeDriver: true,
	});

	const panResponders = useRef(PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onMoveShouldSetPanResponder: () => false,
		onPanResponderMove: (event, gestureState) => {
			panY.setValue(gestureState.dy);
      console.log(gestureState.moveY)
      console.log(gestureState.dy)
		},
		onPanResponderRelease: (event, gestureState) => {
			if(gestureState.dy > 0 && gestureState.moveY > 675) {
				closeModal();
			}
			else {
				resetBottomSheet.start();
			}
		}
	})).current;

	useEffect(()=>{
		if(props.modalVisible) {
			resetBottomSheet.start();
		}
	}, [props.modalVisible]);

	const closeModal = () => {
		closeBottomSheet.start(()=>{
			setModalVisible(false);
		})
    setMapView('100%')
	}

	return (
		<>
		{ modalVisible ?          

				<Animated.View
					style={{...styles.bottomSheetContainer, 
            transform: [{ translateY: translateY }]
          }}
					{...panResponders.panHandlers}
				>
					<Text>This is BottomSheet</Text>   
				</Animated.View>
        :
      <></>}

		</>



	)
}

const styles = StyleSheet.create({
	overlay: {
    // height:'50%',
    zIndex:1,
		flex: 1,
		justifyContent: "flex-end",
		// backgroundColor: "rgba(0, 0, 0, 0.4)"
	},
	background: {
		flex: 1,
	},
	bottomSheetContainer: {
    position: 'absolute', //Here is the trick
    top:'50%',
    height: '100%',
    width:'100%',
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	}
})

export default BottomSheet;