import React, {useEffect, useState} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	BackHandler,
	FlatList,
	StyleSheet,
	Image,
	Linking
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import CustomSubHeader from '../../components/CustomSubHeader';
import ImgRollPic from '../../assets/image/map/ImgRollPic.svg'
import ExpandDown from '../../assets/image/map/ExpandDown.svg'
import ExpandUp from '../../assets/image/map/ExpandUp.svg'
import { levelColorDict, holdColorDict } from '../../assets/info/ColorInfo';


export default function StoreDetail({route, navigation}){
	const {Id} = route.params;
	const [detailInfo, setDetailInfo] = useState({
		name: '',
		phone:'',
	address: '',
	centerNumber: 0,
	imageURL:'',
	levels:[],
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
	const [isPriceToggleOpen, setIsPriceToggleOpen] = useState(true)
	const [todayTimeInfo, setTodayTimeInfo] = useState('')
	const date = new Date()
	const day = date.getDay()
	const dayDict= {
		0:'일',
		1:'월',
		2:'화',
		3:'수',
		4:'목',
		5:'금',
		6:'토'
	}


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
				levels:['빨강','주황','노랑','초록','파랑','남색','보라'],
				event: [{
					date: '', 
					content: '' 
			}],
				time: [{
					day: 0, 
					startTime: '10:00', 
					endTime:'23:00' 
			},
			{
				day: 1, 
				startTime: '10:00', 
				endTime:'23:00' 
			},
			{
				day: 2, 
				startTime: '10:00', 
				endTime:'23:00' 
			},
			{
				day: 3, 
				startTime: '10:00', 
				endTime:'23:00' 
			}, 
			{
				day: 4, 
				startTime: '10:00', 
				endTime:'23:00' 
			},
			{
				day: 5, 
				startTime: '10:00', 
				endTime:'20:00' 
		},
			{
				day: 6, 
				startTime: '10:00', 
				endTime:'20:00' 
		},
		],
				price:
				[
					{name: '스타터 패키지 2개월', price: 350000},
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

	useEffect(()=>{
		const todayInfo = detailInfo.time.filter(info=>info.day === day)[0]
		if (todayInfo){
			setTodayTimeInfo(`${dayDict[day]}  ${todayInfo.startTime} - ${todayInfo.endTime}`)
		}

	},[detailInfo])
	
  return(
		<>
			<CustomSubHeader
			  title={'상세 정보'} // 상단 헤더 제목 (헤더의 왼쪽에 위치)
				navigation={navigation} // 헤더에서 이동 필요할 때 navigation={navigation} 작성해서 상속해주기
			/>

				<ScrollView
					// onScroll={()=>{Animated.event(
					// 	[{nativeEvent:{contentOffset: {y:scrollA}}}]
					// 	, {useNativeDriver:true}
					// )}}
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
						<View style={styles.infoFlex}>
							<Text style={styles.subTitle}>전화번호</Text>
							<View style={{width:27, alignItems:'center'}}><Text style={{color:'black', fontSize:12.5}}>|</Text></View>
							<TouchableOpacity 
								onPress={()=>{Linking.openURL(`tel:${detailInfo.phone}`)}}>
								<Text style={styles.phone}>
									{detailInfo.phone}
								</Text>
							</TouchableOpacity>
						</View>
						{/* 운영시간 text */}
						<View style={styles.infoFlex}>
							<Text style={styles.subTitle}>운영시간</Text>
							<View style={{width:27, alignItems:'center'}}><Text style={{color:'black', fontSize:12.5}}>|</Text></View>

							{/* 운영시간 toggle */}
							{detailInfo.time.length ?								
								isTimeToggleOpen ? 
								<>
								<View>
									{ detailInfo.time.map((info,idx)=>{
										return (
											<Text 
												key={idx}
												style={info.day===day ? styles.detailFocus:styles.detailfont}>
												{dayDict[info.day]}  {info.startTime} - {info.endTime}
											</Text>
										)
									})
									}
								</View> 
								<TouchableOpacity 
									hitSlop={{left: 32, right: 32}}
									style={styles.toggleBtn}
									onPress={()=>{setIsTimeToggleOpen(!isTimeToggleOpen)}}
								>
									<ExpandUp style={{marginTop:6}}/>
								</TouchableOpacity>
								</>
									: 
									<>
									<TouchableOpacity
										onPress={()=>{setIsTimeToggleOpen(!isTimeToggleOpen)}}
									><Text style={styles.detailfont}>{todayTimeInfo? todayTimeInfo: '오늘의 운영 정보가 없습니다'}</Text></TouchableOpacity>
									<TouchableOpacity 
									hitSlop={{left: 32, right: 32}}
									style={styles.toggleBtn}
									onPress={()=>{setIsTimeToggleOpen(!isTimeToggleOpen)}}
									>
										<ExpandDown style={{marginTop:6}}/>
									</TouchableOpacity>
									</>
								:
								<Text>운영 정보가 존재하지 않습니다</Text>	
									}
						</View>
						{/* 가격정보 text */}
						<View style={styles.infoFlex}>
							<Text style={styles.subTitle}>가격정보</Text>
							<View style={{width:27, alignItems:'center'}}><Text style={{color:'black', fontSize:12.5}}>|</Text></View>
							
							{/* 가격정보 toggle */}
							{detailInfo.price.length ? 
								isPriceToggleOpen ? 
								<>
									<View>
									{ detailInfo.price.map((info,idx)=>{
										const p = Number(info.price)
										const priceFormat = p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
										return (
											<Text 
												key={idx+'price'}
												style={styles.detailfont}>
												{info.name}  ꞏ  {priceFormat} 원
											</Text>
										)
									})
									}
								</View> 
								<TouchableOpacity 
									hitSlop={{left: 32, right: 32}}
									style={styles.toggleBtn}
									onPress={()=>{setIsPriceToggleOpen(!isPriceToggleOpen)}}
								>
									<ExpandUp style={{marginTop:6}}/>
								</TouchableOpacity>
								</> 
								: 
								<>
									<TouchableOpacity
										onPress={()=>{setIsPriceToggleOpen(!isPriceToggleOpen)}}
									><Text style={styles.detailfont}>{detailInfo.price[0].name} ꞏ {detailInfo.price[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원 </Text></TouchableOpacity>
									<TouchableOpacity 
									hitSlop={{left: 32, right: 32}}	
									style={styles.toggleBtn}
									onPress={()=>{setIsPriceToggleOpen(!isPriceToggleOpen)}}
									>
										<ExpandDown style={{marginTop:6}}/>
									</TouchableOpacity>
								</>
							
							: <Text>가격 정보가 존재하지 않습니다</Text>}

						</View>
						{/* 난이도 grid */}
						<Text style={{...styles.subTitle, marginTop:10, marginBottom:5}}>난이도</Text>
						<FlatList
							key = {detailInfo.levels}
							data={detailInfo.levels}
							numColumns = {detailInfo.levels.length}
							renderItem = {
								({item}) =>
								<View style={{marginHorizontal:'0.1%',height:25, width:`${100/detailInfo.levels.length - 0.2}%`, backgroundColor:levelColorDict[item]}}></View>
							}
						/>
						{/* 구분선 */}
						<View style={{height:15, borderBottomColor:'#929292',borderBottomWidth:0.2}}></View>
						{/* 주소 */}
						{/* 지도 */}
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
		color:'#323232'
	},
	infoFlex: {
		flexDirection:'row',
		marginBottom: 7,
	},
	detailfont: {
		color:'#323232'
	},
	detailFocus: {
		color:'black',
		fontWeight:'600'
	},
	toggleBtn:{
		height:16,
		paddingLeft:15
	}
})