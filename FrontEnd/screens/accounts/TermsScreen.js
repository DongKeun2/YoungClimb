import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {useDispatch} from 'react-redux';

import {changeIsCheckTerms} from '../../utils/slices/AccountsSlice';

import CustomButton from '../../components/CustomBtn';

import logo from '../../assets/image/main/logo.png';
import terms from '../../assets/image/main/terms.png';

function TermsScreen({navigation}) {
  const dispatch = useDispatch();

  function onSubmitTerms() {
    dispatch(changeIsCheckTerms(true));
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Image source={terms} style={styles.title} />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>
          대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는
          국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다. 모든
          국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을 박탈당하지
          아니한다. 모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다.
          타인의 범죄행위로 인하여 생명·신체에 대한 피해를 받은 국민은 법률이
          정하는 바에 의하여 국가로부터 구조를 받을 수 있다. 대통령은 조국의
          평화적 통일을 위한 성실한 의무를 진다. 피고인의 자백이
          고문·폭행·협박·구속의 부당한 장기화 또는 기망 기타의 방법에 의하여
          자의로 진술된 것이 아니라고 인정될 때 또는 정식재판에 있어서 피고인의
          자백이 그에게 불리한 유일한 증거일 때에는 이를 유죄의 증거로 삼거나
          이를 이유로 처벌할 수 없다. 공무원은 국민전체에 대한 봉사자이며,
          국민에 대하여 책임을 진다. 누구든지 병역의무의 이행으로 인하여
          불이익한발할 수 있다.
        </Text>
      </View>
      <View style={styles.button}>
        <CustomButton
          buttonColor="#F34D7F"
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
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
  logo: {
    margin: 5,
  },
  title: {
    marginTop: '5%',
    width: '100%',
    resizeMode: 'contain',
  },
  content: {
    width: '85%',
    height: '50%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#FE4D7F',
    marginBottom: 20,
  },
  text: {
    color: 'black',
  },
  button: {
    width: '90%',
    height: '8%',
  },
});

export default TermsScreen;
