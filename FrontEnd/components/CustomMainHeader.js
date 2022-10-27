import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';

// import { useNavigation } from '@react-navigation/native';

import mainLogo from '../assets/image/main/logo.png';
import PostAddIcon from '../assets/image/header/postAddIcon.svg';
import NoticeIcon from '../assets/image/header/noticeIcon.svg';
import SettingIcon from '../assets/image/header/settingIcon.svg';

export default class CustomMainHeader extends Component {
  static defaultProps = {
    type: '홈',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.type === '홈' ? (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => null}>
          <Image style={styles.logoImg} source={mainLogo} />
        </TouchableOpacity>
        <View style={styles.iconGroup}>
          <PostAddIcon style={{marginRight: 10}} />
          <NoticeIcon style={{marginRight: 10}} />
        </View>
      </View>
    ) : this.props.type === '프로필' ? (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>{this.props.type}</Text>
        <View style={styles.iconGroup}>
          <PostAddIcon style={{marginRight: 10}} />
          <SettingIcon style={{marginRight: 10}} />
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('댓글')}>
          <Image style={{marginLeft: 5, marginRight: 5}} source={mainLogo} />
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>{this.props.type}</Text>
      </View>
    );
  }
}

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
