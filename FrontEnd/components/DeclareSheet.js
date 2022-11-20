import React, { useEffect, useRef,useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    PanResponder,
		Text,
		BackHandler
} from 'react-native';


import HomeMenuStack from '../stack/HomeMenuStack';


const DeclareSheet = (props) => {
    const { modalVisible, setModalVisible, focusedContent, navigation, route } = props;
		const [focusedPage, setFocusedPage] = useState('메뉴메인')
		const [pageSize, setPageSize] = useState(200)
		const [pageTitle, setPageTitle] = useState('')
		const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

		useEffect(()=>{
			BackHandler.removeEventListener('hardwareBackPress')
			// let backAction
			if (focusedPage ==='메뉴메인'){
				setPageSize(160)
				setPageTitle('')
				// backAction = ()=>{setModalVisible(false)}
			} else if (focusedPage === '게시물정보') {
			  setPageSize(360)
				setPageTitle('게시물 상세 정보')
				// backAction = ()=>{navigation.navigate('메뉴메인')}
			} else if (focusedPage === '표시이유') {
			  setPageSize(220)
				// backAction = ()=>{navigation.navigate('메뉴메인')}
			} else if (focusedPage === '신고') {
			  setPageSize(320)
				setPageTitle('신고하기')
				// backAction = ()=>{navigation.navigate('메뉴메인')}
			}
			// BackHandler.addEventListener('hardwareBackPress',backAction);
			// return BackHandler.removeEventListener('hardwareBackPress')
		},[focusedPage])

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
            if(gestureState.dy > 0 && gestureState.vy > 1.5) {
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
    }

		useEffect(()=>{
			closeModal()
		},[props.closeSignal])

    return (
		<>
		{
			modalVisible?
			<>
				<Animated.View
						style={{...styles.bottomSheetContainer, transform: [{ translateY: translateY }]}}
				>
					<Animated.View style={{...styles.upper, height: pageTitle ? 55:40}} {...panResponders.panHandlers}> 
							<View style={{backgroundColor:'#626262', borderRadius:10,height:3,width:36, position:'absolute', top: pageTitle ? 15:20, left:'50%', transform:[{ translateX: -18}, {translateY: -1.5}]}}></View>
							<Text style={{color:'#323232', fontSize: 15, fontWeight:'600',textAlign:'center', width:'100%', position:'absolute',  top: 24}}>{pageTitle}</Text>
						</Animated.View>
					<View style={{width:'100%', height:pageSize}}>
						<HomeMenuStack style={{height:300, with:'100%'}} setModalVisible={setModalVisible} focusedContent={focusedContent} setFocusedPage={setFocusedPage} parentnavigation={navigation} parentroute={route}/>  
					</View>
				</Animated.View>
			</>
			:
			<></>
		}
		</>
    )
}

const styles = StyleSheet.create({
  background:{
    height:'100%',
    width:'100%',
		position:'absolute',
		bottom:0,
		left:0,
		backgroundColor:'black',
		opacity:0.5,
		zIndex:2,

	},
	upper: {
		width:'100%',
		height:40,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		padding:0,
		margin:0,
		borderBottomColor:'#929292',
		borderBottomWidth:0.1,
		// backgroundColor:'yellow',
		...Platform.select({
			ios:{},
			android:{
				elevation:0.35,
			}
		})
	},
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
		bottomSheetContainer: {
			position: 'absolute', //Here is the trick
			// paddingBottom: 40,
			bottom: 0,
			// height: 'auto',
			width:'100%',
			// justifyContent: "center",
			alignItems: "center",
			backgroundColor: "white",
			borderTopLeftRadius: 10,
			borderTopRightRadius: 10,
			zIndex:3,
		}
})

export default DeclareSheet;