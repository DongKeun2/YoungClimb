import React, {useEffect, useRef} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	BackHandler,
	Animated,
	StyleSheet
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import CustomSubHeader from '../../components/CustomSubHeader';

export default function StoreDetail({route, navigation}){
	const {Id} = route.params;
	const scrollA = useRef(new Animated.Value(0)).current;

	useEffect(
		()=>{
			BackHandler.addEventListener('hardwareBackPress', ()=>{
				navigation.goBack()
				return true
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
			<View
				style={{width:'100%'}}	
			>
				<ScrollView
					onScroll={()=>{Animated.event(
						[{nativeEvent:{contentOffset: {y:scrollA}}}]
						, {useNativeDriver:true}
					)}}
					scrollEventThrottle={16}
					showsVerticalScrollIndicator={false}
					style={{width:'100%'}}

				>
					<View style={styles.bannerContainer}>
						<Animated.Image style={styles.banner(scrollA)} 
							source={ { 
								uri:'https://t1.daumcdn.net/cfile/tistory/9942214E5B5E76930B',
								}}/>
					</View>
					<Text>
					What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
					</Text>
				</ScrollView>

				<Text>{Id}</Text>
				<TouchableOpacity 
				style={{height:30, width:'100%', backgroundColor:'blue'}}
				onPress={()=> navigation.navigate('3D벽', {Id:123})}
				></TouchableOpacity>
			</View>
		</>
	)
}
const BannerH = 250

const styles = StyleSheet.create({
	bannerContainer:{
		marginTop:-1000,
		paddingTop:1000,
		alignItems:'center',
		overflow:'hidden',
		width:'100%'
	},
	banner: (scrollA)=>({
		height: BannerH,
		width:'200%',
		transform: [
			{
				translateY:scrollA
			},
			{
				scale: scrollA.interpolate({
					inputRange:[-BannerH, 0, BannerH, BannerH+1],
					outputRange:[-BannerH/2, 0, BannerH*0.75, BannerH*0.75]
				})
			}
		]
	})
})