import React from 'react';
import {useSelector} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';
import AppSettings from '../screens/profile/AppSettings';
import AppInfo from '../screens/profile/AppInfo';
import ServiceTermsScreen from '../screens/profile/ServiceTermsScreen';
import CustomDrawer from '../components/CustomDrawer';

import Edit from '../assets/image/drawer/profileEdit.svg';
import Share from '../assets/image/drawer/share.svg';
import Setting from '../assets/image/drawer/appSetting.svg';
import Info from '../assets/image/drawer/appInfo.svg';

const Drawer = createDrawerNavigator();

const ProfileDrawer = () => {
  const nickname = useSelector(state => state.accounts.currentUser.nickname);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="메인 프로필"
      detachInactiveScreens={false}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerStyle: {
          width: 190,
        },
        drawerLabelStyle: {marginLeft: -25},
      }}>
      <Drawer.Screen
        name="메인 프로필"
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
      <Drawer.Screen
        name="프로필 설정"
        component={ProfileEditScreen}
        options={{drawerIcon: () => <Edit width={20} height={20} />}}
      />
      <Drawer.Screen
        name="공유하기"
        component={ShareScreen}
        options={{
          drawerIcon: () => <Share width={20} height={20} marginLeft={-2} />,
        }}
      />
      <Drawer.Screen
        name="앱 설정"
        component={AppSettings}
        options={{drawerIcon: () => <Setting width={20} height={20} />}}
      />
      <Drawer.Screen
        name="앱 정보"
        component={AppInfoStack}
        options={{drawerIcon: () => <Info width={20} height={20} />}}
      />
    </Drawer.Navigator>
  );
};

import {createStackNavigator} from '@react-navigation/stack';
import ShareScreen from '../screens/profile/ShareScreen';
const Stack = createStackNavigator();

function AppInfoStack() {
  return (
    <Stack.Navigator
      initialRouteName="정보"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="정보" component={AppInfo} />
      <Stack.Screen name="이용약관" component={ServiceTermsScreen} />
    </Stack.Navigator>
  );
}

export default ProfileDrawer;
