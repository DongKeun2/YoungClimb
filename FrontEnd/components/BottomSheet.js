import React, { useEffect, useRef, useState } from 'react';
import {
	View,
	StyleSheet,
	Text,
	Modal,
	Animated,
	TouchableWithoutFeedback,
	ScrollView,
	Dimensions,
	PanResponder
} from 'react-native';

const BottomSheet = (props) => {
	const { modalVisible, setModalVisible, setMapView, climbingLocations } = props;
	const [modalStat, setModalStat] = useState('half')
	const screenHeight = Dimensions.get("screen").height;
	const windowHeight = Dimensions.get('window').height
	const panY = useRef(new Animated.Value(screenHeight)).current;
	const translateY = panY.interpolate({
		inputRange: [-1, 0, 1],
		outputRange: [-0.5, 0, 1],
	});
	useEffect(()=>{console.log(modalStat)},[modalStat])


	const fullBottomSheet = Animated.timing(panY, {
		toValue:-screenHeight,
		duration:300,
		useNativeDriver: true
	})

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
		},
		onPanResponderRelease: (event, gestureState) => {
			if(modalStat==='half' && gestureState.dy > 0 && gestureState.dy > windowHeight/4 ) {
				console.log(1)
				closeModal();

			}
			else if(modalStat==='full' && gestureState.dy > 0 && gestureState.dy > windowHeight/2 ){
				console.log(2)
				closeModal()

			}
			else if(modalStat==='full' && gestureState.dy > 0 && gestureState.dy > windowHeight/4 ){
				resetBottomSheet.start()
				// setModalStat('half')
				console.log(3)

			}
			else if (modalStat==='half' && gestureState.dy < 0 && gestureState.dy < -windowHeight/4) {
				fullBottomSheet.start()
				setModalStat('full')
				console.log(4)

			}
			else if (modalStat === 'full') {
				fullBottomSheet.start()
				setModalStat('full')
				console.log(5)

			}
			else {
				resetBottomSheet.start();
				setModalStat('half')
				console.log(6)
				console.log(gestureState.dy, modalStat)

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
			setModalStat('closed')
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
					<ScrollView style={{height:screenHeight}}>
						<View style={{height:'200%', width:'100%'}}></View>
					</ScrollView>
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
    // paddingBottom:'10%',
    top:'50%',
    height: '110%',
    width:'100%',
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	}
})

export default BottomSheet;