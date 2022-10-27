import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Image} from 'react-native';
import backicon from '../assets/image/header/backIcon.png';

export default class CustomSubHeader extends Component {
  static defaultProps = {
    title: 'untitled',
    onPress: () => null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image style={{marginLeft: 5, marginRight: 5}} source={backicon} />
        </TouchableOpacity>
        <Text style={{fontSize: 16}}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: 'white',
  },
});
