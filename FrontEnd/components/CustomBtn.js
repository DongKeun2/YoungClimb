import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

TouchableOpacity.defaultProps = {activeOpacity: 0.8};

export default class CustomButton extends Component {
  static defaultProps = {
    title: 'untitled',
    buttonColor: '#000',
    width: '100%',
    height: 50,
    titleColor: '#fff',
    onPress: () => null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: this.props.buttonColor,
            height: this.props.height,
            width: this.props.width,
          },
        ]}
        onPress={this.props.onPress}>
        <Text style={[styles.title, {color: this.props.titleColor}]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 15,
  },
});
