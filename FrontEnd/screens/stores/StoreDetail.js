import React, {useEffect, useState} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	BackHandler,
	Animated,
	StyleSheet,
	Image,
	Linking
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import CustomSubHeader from '../../components/CustomSubHeader';
import ImgRollPic from '../../assets/image/map/ImgRollPic.svg'


export default function StoreDetail({route, navigation}){
	const {Id} = route.params;
	const [detailInfo, setDetailInfo] = useState({
		name: '',
		phone:'',
	address: '',
	centerNumber: 0,
	imageURL:'',
	event: [{
		date: '', 
		content: '' 
}],
	time: [{
		day: '', 
		startTime: '', 
		endTime:'' 
}],
	price: [{
		name: '', 
		price: ''
}],
	latitude:0,
	longitude:0,
	})
	const [isTimeToggleOpen, setIsTimeToggleOpen] = useState(false)
	const [isPriceToggleOpen, setIsPriceToggleOpen] = useState(false)


	useEffect(
		()=>{
			BackHandler.addEventListener('hardwareBackPress', ()=>{
				navigation.goBack()
				return true
			})

			setDetailInfo({
				phone:'02-576-8821',
				name: '더클라임 클라이밍 짐앤샵 강남점',
				address: '서울특별시 강남구 테헤란로8길 21 화인강남빌딩 B1층',
				centerNumber: 0,
				imageURL:'https://blog.kakaocdn.net/dn/bRo0BE/btrIftkCXTX/WtPj5QCrrf9V8hSkdIRql0/img.png',
				event: [{
					date: '', 
					content: '' 
			}],
				time: [{
					day: '월', 
					startTime: '10:00', 
					endTime:'23:00' 
			},
			{
				day: '화', 
				startTime: '10:00', 
				endTime:'23:00' 
			},
			{
				day: '수', 
				startTime: '10:00', 
				endTime:'23:00' 
			},
			{
				day: '목', 
				startTime: '10:00', 
				endTime:'23:00' 
			}, 
			{
				day: '금', 
				startTime: '10:00', 
				endTime:'23:00' 
			},
			{
				day: '토', 
				startTime: '10:00', 
				endTime:'20:00' 
		},
			{
				day: '일', 
				startTime: '10:00', 
				endTime:'20:00' 
		},
		],
				price: [{name: '스타터 패키지 2개월', price: 350000},
				{name: '스타터 패키지 2개월', price: 220000},
				{name: '일일 체험 강습', price: 30000},
				{name: '일일 이용권', price: 22000},
				{name: '평일 이용권(17시까지)', price: 110000},
				{name: '주말 강습', price: 180000},
				{name: '키즈 주말 강습', price: 160000},
				{name: '정기권(3개월)', price: 330000}
				],
			latitude: 37.49622174266254, longitude: 127.03029194140458
		})


		return () => BackHandler.removeEventListener('hardwareBackPress')
		},[]
	)
	
  return(
		<>
			<CustomSubHeader
			  title={'상세 정보'} // 상단 헤더 제목 (헤더의 왼쪽에 위치)
				navigation={navigation} // 헤더에서 이동 필요할 때 navigation={navigation} 작성해서 상속해주기
			/>

				<ScrollView
					onScroll={()=>{Animated.event(
						[{nativeEvent:{contentOffset: {y:scrollA}}}]
						, {useNativeDriver:true}
					)}}
					scrollEventThrottle={16}
					showsVerticalScrollIndicator={false}
					style={{width:'100%', backgroundColor:'white'}}

				>
					<Image 
						style={styles.image}
						source={ { 
							uri:'https://blog.kakaocdn.net/dn/bRo0BE/btrIftkCXTX/WtPj5QCrrf9V8hSkdIRql0/img.png',
							}}/>

					<View
						style={styles.mainContainer}
					>
						<View style={styles.headContainer}>
							{/* 이름 */}
							<Text style={styles.nameFont}>{detailInfo.name}</Text>
							{/* 3d벽 버튼 */}
							<TouchableOpacity 
							style={{...styles.wallBtn, backgroundColor:'white'}}
							onPress={()=> navigation.navigate('3D벽', {Id:detailInfo.centerNumber})}
							>
								<ImgRollPic style={{height:20}}/>
								<Text style={{color: 'black', fontWeight:'bold'}}>3D</Text>
							</TouchableOpacity>
						</View>
						{/* 연락처 */}
						<View>
							<Text style={styles.subTitle}>연락처</Text>
							<Text>|</Text>
							<TouchableOpacity 
								onPress={()=>{Linking.openURL(`tel:${detailInfo.phone}`)}}>
								<Text style={styles.phone}>
									{detailInfo.phone}
								</Text>
								</TouchableOpacity>
						</View>
						{/* 운영시간 text */}
						<Text style={styles.subTitle}>운영 시간</Text>
						{/* 운영시간 toggle */}
							{ isTimeToggleOpen ? <></> : <></>}
						{/* 가격정보 text */}
						<Text style={styles.subTitle}>가격 정보</Text>
						{/* 가격정보 toggle */}
							{ isPriceToggleOpen ? <></> : <></>}
						{/* 난이도 grid */}
						{/* 구분선 */}
						{/* 주소 */}
						{/* 지도 */}

						<Text>{Id}</Text>
					</View>
					<View style={{height:50, width:'100%'}}></View>

				</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	image:{
		width: '100%',
		height: 250,
		resizeMode: "cover",
		overflow:'hidden',
	},
	mainContainer:{
		width:'100%',
		padding:20
	},
	headContainer:{
		flex:1,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		marginBottom:20
	},
	nameFont: {
		fontSize:18,
		fontWeight: 'bold',
		color:'black'
	},
	wallBtn:{
		fontSize: 16,
		color: 'black',
		height:30, 
		width:60,
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'center',
		borderRadius: 5,
		borderColor:'#F34D7F',
		borderWidth:1.2,
		...Platform.select({
			ios:{},
			android:{
				elevation:1,
			}
		})
	},
	subTitle:{
		fontSize:14,
		fontWeight:'600',
		color:'black'
	},
	phone:{
		textDecorationLine: 'underline',
		color:'#525252'
	}

})