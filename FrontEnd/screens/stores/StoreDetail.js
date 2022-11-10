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
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomSubHeader from '../../components/CustomSubHeader';
import ImgRollPic from '../../assets/image/map/ImgRollPic.svg'
import ExpandDown from '../../assets/image/map/ExpandDown.svg'
import ExpandUp from '../../assets/image/map/ExpandUp.svg'
import Location from '../../assets/image/map/Location.svg'
import { levelColorDict, holdColorDict } from '../../assets/info/ColorInfo';
import axios from 'axios';
import api from '../../utils/api';
import MyLocationImg from '../../assets/image/map/MyLocation.png'

import NaverMapView, {Marker, Align} from "react-native-nmap";



export default function StoreDetail({route, navigation}){
	const {Id} = route.params;
	const [detailInfo, setDetailInfo] = useState({
		wall:false,
		name: '',
		phoneNumber:'',
	address: '',
	centerNumber: 0,
	imageURL:'',
	centerLevelList:[],
	centerEventList: [{
		date: '', 
		content: '' 
}],
centerTimeList: [{
		day: '', 
		timeStart: '', 
		timeEnd:'' 
}],
centerPriceList: [{
		name: '', 
		price: ''
}],
	latitude:0,
	longitude:0,
	})
	const [isTimeToggleOpen, setIsTimeToggleOpen] = useState(false)
	const [isPriceToggleOpen, setIsPriceToggleOpen] = useState(false)
	const [todayTimeInfo, setTodayTimeInfo] = useState('')
	const [noData, setNoData] = useState(false)
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
			const source = axios.CancelToken.source();
			axios.get(api.center(route.params.Id), {cancelToken: source.token})
			.then(res=>{
				setDetailInfo(res.data)
			})
			.catch(err=>{
				console.log(err)
				setNoData(true)
			})
		return () => {
			source.cancel();
		}
		},[]
	)

	useEffect(()=>{
		console.log(detailInfo)
		const todayInfo = detailInfo.centerTimeList.filter(info=>info.day === day)[0]
		if (todayInfo){
			setTodayTimeInfo(`${dayDict[day]}  ${todayInfo.timeStart.slice(0,5)} - ${todayInfo.timeEnd.slice(0,5)}`)
		}

	},[detailInfo])
	
  return(
		<>
			<CustomSubHeader
			  title={'상세 정보'} // 상단 헤더 제목 (헤더의 왼쪽에 위치)
				navigation={navigation} // 헤더에서 이동 필요할 때 navigation={navigation} 작성해서 상속해주기
			/>
				{	noData ? 
				<View style={{alignItems:'center', height:'100%', width:'100%'}}><Text>지점 정보가 존재하지 않습니다.</Text></View>
				:

				<ScrollView
					showsVerticalScrollIndicator={false}
					style={{width:'100%', backgroundColor:'white', paddingBottom:50}}
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
							{detailInfo.wall?
								<TouchableOpacity 
								style={{...styles.wallBtn, backgroundColor:'white'}}
								onPress={()=> navigation.navigate('3D벽', {Id: Id})}
								>
									<ImgRollPic style={{height:20}}/>
									<Text style={{color: 'black', fontWeight:'bold'}}>3D</Text>
								</TouchableOpacity>
							:
							<></>
						}
						</View>
						{/* 연락처 */}
						<View style={styles.infoFlex}>
							<Text style={styles.subTitle}>전화번호</Text>
							<View style={{width:27, alignItems:'center'}}><Text style={{color:'black', fontSize:12.5}}>|</Text></View>
							<TouchableOpacity 
								onPress={()=>{Linking.openURL(`tel:${detailInfo.phoneNumber}`)}}>
								<Text style={styles.phone}>
									{detailInfo.phoneNumber}
								</Text>
							</TouchableOpacity>
						</View>
						{/* 운영시간 text */}
						<View style={styles.infoFlex}>
							<Text style={styles.subTitle}>운영시간</Text>
							<View style={{width:27, alignItems:'center'}}><Text style={{color:'black', fontSize:12.5}}>|</Text></View>

							{/* 운영시간 toggle */}
							{detailInfo.centerTimeList.length ?								
								isTimeToggleOpen ? 
								<>
								<View>
									{ detailInfo.centerTimeList.map((info,idx)=>{
										return (
											<Text 
												key={idx}
												style={info.day===day ? styles.detailFocus:styles.detailfont}>
												{dayDict[info.day]}  {info.timeStart.slice(0,5)} - {info.timeEnd.slice(0,5)}
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
							{detailInfo.centerPriceList.length ? 
								isPriceToggleOpen ? 
								<>
									<View>
									{ detailInfo.centerPriceList.map((info,idx)=>{
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
									><Text style={styles.detailfont}>{detailInfo.centerPriceList[0].name} ꞏ {detailInfo.centerPriceList[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원 </Text></TouchableOpacity>
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
						<View style={{width:'100%', height:25, flexDirection:'row'}}>
							{detailInfo.centerLevelList?.map((item, idx) => {
								return(
									<View key={item.color} style={{marginHorizontal:'0.1%',height:25, width:`${100/detailInfo.centerLevelList.length - 0.2}%`, backgroundColor:levelColorDict[item.color]}}></View>
								)
							})}
						</View>
						{/* 구분선 */}
						<View style={{height:15, borderBottomColor:'#929292',borderBottomWidth:0.2}}></View>
						{/* 주소 */}
						{/* 지도 */}
						<View style={{flexDirection:'row', marginTop:12, marginBottom:10}}>
							<Location style={{marginTop:1}}/>
							<Text style={{...styles.subTitle, marginLeft:5}}>{detailInfo.address}</Text>
						</View>
							<NaverMapView style={{width: '100%', height: 300}}
          			zoomControl ={true}
								center={{latitude:detailInfo.latitude,longitude:detailInfo.longitude, zoom: 13}}
							>
								<Marker coordinate={{latitude:detailInfo.latitude,longitude:detailInfo.longitude}} image={MyLocationImg}/>
							</NaverMapView>
					</View>

					<View style={{height:50, width:'100%'}}></View>
				</ScrollView>
				}
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