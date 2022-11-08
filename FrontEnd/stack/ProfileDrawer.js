import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';
import AppSettings from '../screens/profile/AppSettings';

const Drawer = createDrawerNavigator();

const ProfileDrawer = () => {
  const nickname = useSelector(state => state.accounts.currentUser.nickname);
  return (
    <Drawer.Navigator
      initialRouteName="메인 프로필"
      detachInactiveScreens={true}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerStyle: {
          // backgroundColor: 'black',
          width: 150,
        },
      }}>
      <Drawer.Screen
        name="메인프로필"
        component={ProfileScreen}
        options={{
          drawerItemStyle: {display: 'none'},
        }}
        style={{display: 'none'}}
        initialParams={{
          initial: true,
          nickname,
        }}
      />
      <Drawer.Screen name="프로필 설정" component={ProfileEditScreen} />
      <Drawer.Screen name="앱 설정" component={AppSettings} />
    </Drawer.Navigator>
  );
};

export default ProfileDrawer;
