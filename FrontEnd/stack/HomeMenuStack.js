import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DeclareMenu from '../components/HomeMenu/DeclareMenu'
import MenuMain from '../components/HomeMenu/MenuMain'
import ReasonShown from '../components/HomeMenu/ReasonShown'
import ContentInfo from '../components/HomeMenu/ContentInfo'
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Stack = createStackNavigator();

const HomeMenuStack = (props) =>{
  const {parentnavigation, parentroute, focusedContent, setFocusedPage, setModalVisible} = props
  
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(parentroute);
    setFocusedPage(routeName)
    console.log(routeName, parentroute)
  },[parentnavigation,parentroute]);

  return(
    <Stack.Navigator
    initialRouteName="메뉴메인"
    screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="메뉴메인" options={{headerShown:false}}>
        {props => <MenuMain {...props} parentnavigation={parentnavigation} focusedContent={focusedContent} setModalVisible={setModalVisible} />}
      </Stack.Screen>
      <Stack.Screen name="신고" options={{headerShown:false}}>
        {props => <DeclareMenu {...props} parentnavigation={parentnavigation} focusedContent={focusedContent} />}
      </Stack.Screen>
      <Stack.Screen name="표시이유" options={{headerShown:false}}>
        {props => <ReasonShown {...props} parentnavigation={parentnavigation} focusedContent={focusedContent} />}
      </Stack.Screen>
      <Stack.Screen name="게시물정보" options={{headerShown:false}}>
        {props => <ContentInfo {...props} parentnavigation={parentnavigation} focusedContent={focusedContent} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default HomeMenuStack;

