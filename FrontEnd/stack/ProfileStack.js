import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';
import FollowScreen from '../screens/profile/FollowScreen';
import DetailScreen from '../screens/profile/DetailScreen';
import CommentScreen from '../screens/profile/CommentScreen';
import WingspanScreen from '../screens/accounts/WingspanScreen';

import PostAddStack from './PostAddStack';
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
      initialRouteName="메인프로필"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="메인프로필"
        component={ProfileScreen}
        initialParams={{
          initial: true,
          nickname,
        }}
      />
      <Stack.Screen name="게시글 생성" component={PostAddStack} />
      <Stack.Screen name="프로필 설정" component={ProfileEditScreen} />
      <Stack.Screen name="팔로우" component={FollowScreen} />
      <Stack.Screen name="게시글" component={DetailScreen} />
      <Stack.Screen name="댓글" component={CommentScreen} />
      <Stack.Screen name="서브프로필" component={ProfileScreen} />
      <Stack.Screen name="윙스팬" component={WingspanScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
