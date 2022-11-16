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
      <TouchableOpacity
        style={styles.logout}
        onPress={() => dispatch(logout())}>
        <Text style={styles.link}>로그아웃</Text>
      </TouchableOpacity>
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
  logout: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  link: {color: '#F34D7F'},
});

export default CustomDrawer;
