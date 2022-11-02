import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomMainHeader from '../components/CustomMainHeader';

import SearchBtnIcon from '../assets/image/search/searchBtn.svg';
import UserIcon from '../assets/image/search/user.svg';
import UserActiveIcon from '../assets/image/search/userA.svg';
import BoardIcon from '../assets/image/search/hold.svg';
import BoardActiveIcon from '../assets/image/search/holdA.svg';
import Checked from '../assets/image/main/checked.svg';
import UnChecked from '../assets/image/main/unchecked.svg';

function SearchScreen({navigation}) {
  const [type, setType] = useState('board');

  return (
    <SafeAreaView style={styles.container}>
      <CustomMainHeader type="검색" />

      {type === 'board' ? (
        <View style={styles.tabBox}>
          <TouchableOpacity onPress={() => {}} style={styles.activeTab}>
            <BoardActiveIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setType('user');
            }}
            style={styles.tabBtn}>
            <UserIcon />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.tabBox}>
          <TouchableOpacity
            onPress={() => {
              setType('board');
            }}
            style={styles.tabBtn}>
            <BoardIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.activeTab}>
            <UserActiveIcon />
          </TouchableOpacity>
        </View>
      )}

      {type === 'board' ? (
        <BoardTab navigation={navigation} />
      ) : (
        <UserTab navigation={navigation} />
      )}
    </SafeAreaView>
  );
}

function BoardTab({navigation}) {
  const [isCheck, setIsCheck] = useState(false);
  function onSubmitSearch() {
    navigation.navigate('검색 결과');
  }

  return (
    <>
      <View style={styles.checkGroup}>
        {isCheck ? (
          <TouchableOpacity
            onPress={() => {
              setIsCheck(false);
            }}>
            <Checked width={20} height={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsCheck(true);
            }}>
            <UnChecked width={20} height={20} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            setIsCheck(!isCheck);
          }}>
          <Text style={styles.text}>
            &nbsp; 나와 체형이 비슷한 사람의 결과만 보기
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onSubmitSearch} style={styles.button}>
        <SearchBtnIcon />
        <Text style={styles.btnText}>검색</Text>
      </TouchableOpacity>
    </>
  );
}

function UserTab({navigation}) {
  return <></>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '80%',
    height: 40,
    backgroundColor: '#F34D7F',
    margin: 5,
    marginVertical: 15,
  },
  btnText: {
    color: 'white',
  },
  tabBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBtn: {
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4F4',
  },
  activeTab: {
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F34D7F',
  },
  checkGroup: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
  text: {
    color: 'black',
    fontSize: 13,
  },
});

export default SearchScreen;
