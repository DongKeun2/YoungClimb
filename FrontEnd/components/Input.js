import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const Input = props => {
  let template = null;
  switch (props.type) {
    case 'textInput':
      template = <TextInput {...props} style={styles.input} />;
      break;
    case 'textInputRevised':
      template = <TextInput {...props} style={styles.inputRevised} />;
      break;
    default:
      return template;
  }
  return template;
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#464646',
    fontSize: 17,
    padding: 5,
    marginTop: 30,
  },
  inputRevised: {
    width: '80%',
    borderBottomWidth: 3,
    borderBottomColor: 'red',
    fontSize: 17,
    padding: 5,
    marginTop: 30,
  },
});

export default Input;
