import React from 'react';
import {
	View,
	Text
}
from 'react-native'

export default function StoreDetail({route, navigation}){
	const {Id} = route.params;
  return(
		<View><Text>{Id}</Text></View>
	)
}