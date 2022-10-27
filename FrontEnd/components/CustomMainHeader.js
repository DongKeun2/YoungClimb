import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';

import mainLogo from '../assets/image/main/logo.png';
import PostAddIcon from '../assets/image/header/postAddIcon.svg';
import NoticeIcon from '../assets/image/header/noticeIcon.svg';
import SettingIcon from '../assets/image/header/settingIcon.svg';

function CustomMainHeader(props) {
  return props.type === '홈' ? (
    <View style={styles.container}>
      <Image style={styles.logoImg} source={mainLogo} />
      <View style={styles.iconGroup}>
        <TouchableOpacity
          onPress={() => (props.navigation ? props.navigation.navigate('게시글 생성') : null)}>
          <PostAddIcon style={{marginRight: 10}} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => (props.navigation ? props.navigation.navigate('알림') : null)}>
          <NoticeIcon style={{marginRight: 10}} />
        </TouchableOpacity>
      </View>
    </View>
  ) : props.type === '프로필' ? (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{props.type}</Text>
      <View style={styles.iconGroup}>
        <TouchableOpacity
          onPress={() => (props.navigation ? props.navigation.goBack() : null)}>
          <PostAddIcon style={{marginRight: 10}} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => (props.navigation ? props.navigation.goBack() : null)}>
          <SettingIcon style={{marginRight: 10}} />
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{props.type}</Text>
    </View>
  );
}

CustomMainHeader.defaultProps = {
  type: '홈',
  navigation: null,
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  logoImg: {
    height: 32,
    resizeMode: 'contain',
  },
  iconGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default CustomMainHeader;
