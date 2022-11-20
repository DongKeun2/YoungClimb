import React from 'react';
import { WebView } from 'react-native-webview';
import CustomSubHeader from '../../components/CustomSubHeader';


export default function Store3DWall({route, navigation}){
	const {Id} = route.params;
	console.log(route.params)
	return(
		<>
			<CustomSubHeader
			title={'3D 벽'} // 상단 헤더 제목 (헤더의 왼쪽에 위치)
			navigation={navigation} // 헤더에서 이동 필요할 때 navigation={navigation} 작성해서 상속해주기
			/>
			<WebView
        source={{uri: `https://k7a701.p.ssafy.io/3dWall/${Id}/0`}}
      />
		</>
	)
}