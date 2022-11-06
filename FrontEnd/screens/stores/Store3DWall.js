import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	BackHandler
} from 'react-native'
import CustomSubHeader from '../../components/CustomSubHeader';


export default function Store3DWall({route, navigation}){
	BackHandler.addEventListener('hardwareBackPress', ()=>{
		navigation.goBack()
		return true
	})
	return(
		<>
			<CustomSubHeader
			title={'3D 벽'} // 상단 헤더 제목 (헤더의 왼쪽에 위치)
			navigation={navigation} // 헤더에서 이동 필요할 때 navigation={navigation} 작성해서 상속해주기
			/>
		
		</>
	)
}