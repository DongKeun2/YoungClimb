import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import signup from '../../assets/image/main/signup.png';

function SignupScreen({navigation}) {
  const [page, setPage] = useState(false);

  if (page) {
    return <SecondPage navigation={navigation} setPage={setPage} />;
  } else {
    return <FirstPage navigation={navigation} setPage={setPage} />;
  }
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
  input: {},
  button: {
    width: '80%',
    height: '10%',
  },
  link: {
    color: '#F34D7F',
  },
  next: {},
  before: {},
});

const FirstPage = ({navigation, setPage}) => {
  function goNextPage() {
    setPage(true);
  }
  return (
    <View style={styles.container}>
      <Image source={signup} style={styles.title} />
      <TouchableOpacity onPress={() => navigation.navigate('약관')}>
        <Text style={styles.link}>약관</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goNextPage}>
        <Text style={styles.next}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const SecondPage = ({navigation, setPage}) => {
  function goBeforePage() {
    setPage(false);
  }
  return (
    <View style={styles.container}>
      <Image source={signup} style={styles.title} />
      <TouchableOpacity onPress={() => navigation.navigate('윙스팬')}>
        <Text style={styles.link}>윙스팬 측정</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBeforePage}>
        <Text style={styles.before}>이전</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
