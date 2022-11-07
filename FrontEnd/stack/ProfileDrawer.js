import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import ProfileScreen from '../screens/profile/ProfileScreen';

function Page1({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'steelblue',
      }}>
      <Text>Page1</Text>
    </View>
  );
}

function Page2({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gold',
      }}>
      <Text>Page2</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

const ProfileDrawer = () => {
  const nickname = useSelector(state => state.accounts.currentUser.nickname);
  return (
    <Drawer.Navigator initialRouteName="메인 프로필">
      <Drawer.Screen
        name="메인프로필"
        component={ProfileScreen}
        initialParams={{
          initial: true,
          nickname,
        }}
      />
      <Drawer.Screen name="P1" component={Page1} />
      <Drawer.Screen name="P2" component={Page2} />
    </Drawer.Navigator>
  );
};

export default ProfileDrawer;
