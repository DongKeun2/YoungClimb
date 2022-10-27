import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';

// import { useNavigation } from '@react-navigation/native';

import mainLogo from '../assets/image/main/logo.png';
import postAddIcon from '../assets/image/header/postAddIcon.png';
import noticeIcon from '../assets/image/header/noticeIcon.png';
import settingIcon from '../assets/image/header/settingIcon.png';

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
        <Image source={mainLogo} />
        <View style={styles.iconGroup}>
          <Image style={{marginRight: 10}} source={postAddIcon} />
          <Image style={{marginRight: 10}} source={noticeIcon} />
        </View>
      </View>
    ) : this.props.type === '프로필' ? (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>{this.props.type}</Text>
        <View style={styles.iconGroup}>
          <Image style={{marginRight: 10}} source={postAddIcon} />
          <Image style={{marginRight: 10}} source={settingIcon} />
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
  iconGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
});
