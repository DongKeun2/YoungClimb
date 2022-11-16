import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../utils/slices/AccountsSlice';
import Logout from '../assets/image/drawer/logout.svg';

function CustomDrawer(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.accounts.currentUser);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <ImageBackground style={styles.background}>
          <Image
            source={require('../assets/image/main/logo.png')}
            style={styles.image}
          />
        </ImageBackground>
        <View />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutBox}
          onPress={() => dispatch(logout())}>
          <View style={styles.logoutBox}>
            <Logout width={20} height={20} />
            <Text style={styles.link}>로그아웃</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  // background: {backgroundColor: 'black'},
  image: {
    // alignSelf: 'center',
    height: 20,
    width: 20,
    resizeMode: 'contain',
    padding: 20,
    marginLeft: 20,
    // marginRight: 20,
    marginVertical: 5,
  },
  footer: {padding: 20, borderTopWidth: 1, borderTopColor: '#CCCCCC'},
  logoutBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {color: 'black', marginLeft: 5},
});

export default CustomDrawer;
