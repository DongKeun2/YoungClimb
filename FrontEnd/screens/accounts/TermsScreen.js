import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useDispatch} from 'react-redux';

import {onCheckTerms} from '../../utils/slices/AccountsSlice';

import CustomButton from '../../components/CustomBtn';

import terms from '../../assets/image/main/terms.png';

function TermsScreen({navigation}) {
  const dispatch = useDispatch();

  function onSubmitTerms() {
    dispatch(onCheckTerms(true));
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <Image source={terms} style={styles.title} />
      <View style={styles.button}>
        <CustomButton
          buttonColor="#EF3F8F"
          title="약관 동의하기"
          onPress={onSubmitTerms}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    marginTop: '5%',
    width: '100%',
    resizeMode: 'contain',
  },
  button: {
    width: '90%',
    height: '8%',
  },
});

export default TermsScreen;
