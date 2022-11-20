import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const Input = props => {
  switch (props.type) {
    case 'textInput':
      return <TextInput {...props} style={[styles.input]} />;
    case 'textInputRevised':
      return <TextInput {...props} style={styles.inputRevised} />;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#464646',
    fontSize: 16,
    color: 'black',
    padding: 5,
    marginTop: 30,
  },
  inputRevised: {
    width: '80%',
    borderBottomWidth: 3,
    borderBottomColor: 'red',
    fontSize: 16,
    padding: 5,
    marginTop: 30,
  },
});

export default Input;
