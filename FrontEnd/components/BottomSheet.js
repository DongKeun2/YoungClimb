import React, { useEffect, useRef, useState } from 'react';
import {
	View,
	StyleSheet,
	Text,
	Animated,
	Dimensions,
	PanResponder,
	FlatList,
	Platform,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BottomSheet = (props) => {
	const { modalVisible, setModalVisible, navigation, climbingLocations } = props;
	const [modalStat, setModalStat] = useState('half')
	const screenHeight = Dimensions.get("screen").height;
	const screenWidth = Dimensions.get("screen").width;
	const windowHeight = Dimensions.get('window').height
	const halfSize = windowHeight/2-110
	const fullSize = windowHeight-110
	const panY = useRef(new Animated.Value(screenHeight)).current;
	const translateY = panY.interpolate({
		inputRange: [-1, 0, 1],
		outputRange: [-0.5, 0, 1],
	});

	useEffect(()=>{
		if (!modalVisible){
			setModalStat('closed')
		} else{
			setModalStat('half')
		}
	}, [modalVisible])


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
		onStartShouldSetPanResponder:()=> true,
		onPanResponderMove: (event, gestureState) => {
				panY.setValue(gestureState.y0+gestureState.dy);
		},
		onPanResponderRelease: (event, gestureState) => {
			if(gestureState.y0 > windowHeight/2 && gestureState.dy > 0 && gestureState.dy > windowHeight/8 ) {
				closeModal();
			}
			else if(gestureState.y0 < windowHeight/2 && gestureState.dy > 0 && gestureState.dy > windowHeight/4 ){
				closeModal()
			}
			else if(modalStat==='full' && gestureState.dy > 0 && gestureState.dy > windowHeight/8 ){
				resetBottomSheet.start()
				setModalStat('half')
			}
			else if (modalStat==='half' && gestureState.dy < 0 && gestureState.dy < -windowHeight/8) {
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
	}

	const refactorDis = (dis) =>{
		if (dis >= 1000) {
			return String((dis/1000).toFixed(1))+'km' 
		} else {
			return String(dis)+'m'
		}
	}

	const renderItem = ({item}) =>{
		return(
			<TouchableOpacity 
				onStartShouldSetResponderCapture={() => true}
				onMoveShouldSetResponderCapture={() => true}
				style={{...styles.renderItemContainer, width:screenWidth}}
				onPress={()=> navigation.navigate('지점상세', {Id:item.id})}
				>
				<View style={{...styles.detailContainer}}>
					<Text style={styles.renderItemName}>{item.name}</Text>	
					<Text style={styles.renderItemDetail}>{refactorDis(item.distance)}</Text>
				</View>
					<Text style={styles.renderItemDetail}>{item.address}</Text>
			</TouchableOpacity>

		)
	}


	return (
		<>
		{ modalVisible ?          
				<Animated.View
					style={{...styles.bottomSheetContainer, 
            transform: [{ translateY: translateY }]
          }}
					
				>
					<Animated.View style={styles.upper} {...panResponders.panHandlers}> 
		  			<View style={{backgroundColor:'#525252', borderRadius:10,height:3,width:36, position:'absolute', top:20, left:'50%', transform:[{ translateX: -18}, {translateY: -1.5}]}}></View>
					</Animated.View>
					<TouchableOpacity 
						activeOpacity={1}
						disabled={true} 
						style={{height:modalStat==='full' ? fullSize : halfSize, width:'100%',margin:0, padding:0}}>

							<FlatList
								style={{width:'100%'}}
								onStartShouldSetResponderCapture={() => true}
								onMoveShouldSetResponderCapture={() => true}
								data={climbingLocations}
								renderItem={renderItem}
								keyExtractor={(item)=>item.id}
								showsVerticalScrollIndicator={false}
							/>

					</TouchableOpacity>
				</Animated.View>
        :
      <></>}

		</>



	)
}

const styles = StyleSheet.create({
	renderItemContainer:{
		width:'100%',
		borderBottomColor: '#929292',
    	borderBottomWidth: 0.2,
		paddingHorizontal:18,
		paddingVertical: 13,
		color:'black'
	},
	renderItemName:{
		fontWeight:'bold',
		fontSize: 16,
		color:'black',
		marginBottom:5
	},
	renderItemDetail:{
		fontWeight:'400',
		fontSize:14,
		color:'black'
	},
	detailContainer:{
		flex:1,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		color:'black',
	},
	upper: {
		width:'100%',
		height:40,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		padding:0,
		margin:0,
		// backgroundColor:'yellow',
		...Platform.select({
			ios:{},
			android:{
				elevation:0.35,
			}
		})
	},
	overlay: {
    // height:'50%',
    zIndex:2,
		flex: 1,
		justifyContent: "flex-end",
		// backgroundColor: "rgba(0, 0, 0, 0.4)"
	},
	background: {
		flex: 1,
	},
	bottomSheetContainer: {
    position: 'absolute', //Here is the trick
    paddingBottom: 40,
    top: 0,
    height: '100%',
    width:'100%',
		// justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		zIndex:2
	}
})

export default BottomSheet;