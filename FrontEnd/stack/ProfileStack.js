import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';
import FollowScreen from '../screens/profile/FollowScreen';
import DetailScreen from '../screens/profile/DetailScreen';
import WingspanScreen from '../screens/accounts/WingspanScreen';
import ChoiceVideoScreen from '../screens/postadd/ChoiceVideoScreen';
import PostAddInfoScreen from '../screens/postadd/PostAddInfoScreen';

import ProfileDrawer from './ProfileDrawer';

import {getCurrentUser} from '../utils/Token';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

function ProfileStack({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === '댓글') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: undefined}});
    }
  }, [navigation, route]);

  const nickname = useSelector(state => state.accounts.currentUser.nickname);

  return (
    <Stack.Navigator
      initialRouteName="프로필 메뉴"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="프로필 메뉴"
        component={ProfileDrawer}
        initialParams={{
          initial: true,
          nickname,
        }}
      />
      <Stack.Screen name="게시글 생성" component={ChoiceVideoScreen} />
      <Stack.Screen name="정보 입력" component={PostAddInfoScreen} />
      <Stack.Screen name="프로필 설정" component={ProfileEditScreen} />
      <Stack.Screen name="팔로우" component={FollowScreen} />
      <Stack.Screen name="게시글" component={DetailScreen} />
      <Stack.Screen name="서브프로필" component={ProfileScreen} />
      <Stack.Screen name="윙스팬" component={WingspanScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
