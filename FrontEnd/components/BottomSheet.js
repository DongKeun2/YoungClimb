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
	PanResponder,
	SafeAreaView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BottomSheet = (props) => {
	const { modalVisible, setModalVisible, setMapView, navigation, climbingLocations } = props;
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
		toValue:0,
		duration:300,
		useNativeDriver: true
	})

	const resetBottomSheet = Animated.timing(panY, {
		toValue: windowHeight/2,
		duration: 300,
		useNativeDriver: true,
	});

	const closeBottomSheet = Animated.timing(panY, {
		toValue: screenHeight,
		duration: 300,
		useNativeDriver: true,
	});


	const panResponders = useRef(PanResponder.create({
		onMoveShouldSetPanResponder:()=> true,
		onStartShouldSetPanResponder:()=> false,
		onPanResponderMove: (event, gestureState) => {
				panY.setValue(gestureState.y0+gestureState.dy);
		},
		onPanResponderRelease: (event, gestureState) => {
			if(modalStat==='half' && gestureState.dy > 0 && gestureState.dy > windowHeight/4 ) {
				closeModal();
			}
			else if(modalStat==='full' && gestureState.dy > 0 && gestureState.dy > windowHeight/2 ){
				closeModal()
			}
			else if(modalStat==='full' && gestureState.dy > 0 && gestureState.dy > windowHeight/4 ){
				resetBottomSheet.start()
				setModalStat('half')
			}
			else if (modalStat==='half' && gestureState.dy < 0 && gestureState.dy < -windowHeight/4) {
				fullBottomSheet.start()
				setModalStat('full')
			}
			else if (modalStat === 'full') {
				fullBottomSheet.start()
				setModalStat('full')
			}
			else {
				resetBottomSheet.start();
				setModalStat('half')
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

	const renderItem = (item) =>{
		<TouchableOpacity 
			style={styles.renderItemContainer}
			onPress={()=> navigation.navigate('지점 상세', {Id:item.id})}
			>
			<Text style={styles.renderItemName}>{item.name}</Text>
			<View style={styles.detailContainer}>
				<Text style={styles.renderItemDetail}>{item.address}</Text>
				<Text style={styles.renderItemDetail}>{item.distance}</Text>
			</View>
		</TouchableOpacity>
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
					<View> 
						<Text>상단</Text> 
					</View>
					<Animated.View style={{width:'100%'}}>
						<ScrollView
							onStartShouldSetResponderCapture={() => true}
							onMoveShouldSetResponderCapture={() => true}
							style={{...styles.scrollContainer, height:modalStat==='full' ? '100%' : '50%'}}
						>
						<Text style={{fontSize:50}}>1하하</Text>
						<Text style={{fontSize:50}}>2하하</Text>
						<Text style={{fontSize:50}}>3하하</Text>
						<Text style={{fontSize:50}}>4하하</Text>
						<Text style={{fontSize:50}}>5하하</Text>
						<Text style={{fontSize:50}}>6하하</Text>
						<Text style={{fontSize:50}}>7하하</Text>
						<Text style={{fontSize:50}}>8하하</Text>
						<Text style={{fontSize:50}}>9하하</Text>
						<Text style={{fontSize:50}}>10하하</Text>
						<Text style={{fontSize:50}}>11하하</Text>
						<Text style={{fontSize:50}}>12하하</Text>
						<Text style={{fontSize:50}}>13하하</Text>
						<Text style={{fontSize:50}}>14하하</Text>
						<Text style={{fontSize:50}}>15하하</Text>
						<Text style={{fontSize:50}}>16하하</Text>
						<Text style={{fontSize:50}}>17하하</Text>
						<Text style={{fontSize:50}}>18하하</Text>
						<View style={{height:100, width:'100%'}}></View>
						</ScrollView>

					</Animated.View>
				</Animated.View>
        :
      <></>}

		</>



	)
}

const styles = StyleSheet.create({
	renderItemContainer:{
		width:'100%',
		padding: 5,
	},
	renderItemName:{
		fontWeight:'bold',
		fontSize: 16,
	},
	renderItemDetail:{
		fontWeight:'400',
		fontSize:14
	},
	detailContainer:{
		flex:1,
		flexDirection:'row',
		justifyContent:'space-between'
	},
	scrollContainer:{
		width:'100%',
	},
	upper: {

	},
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
    top: 0,
    height: '110%',
    width:'100%',
		// justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	}
})

export default BottomSheet;