import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';

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

  const [store, setStore] = useState('');

  function onSubmitSearch() {
    navigation.navigate('검색 결과');
  }

  return (
    <>
      <View style={styles.pickerBox}>
        <Text style={styles.text}>지점</Text>
        <View style={styles.pickerItem}>
          <Picker
            mode="dropdown"
            dropdownIconColor="black"
            selectedValue={store}
            style={styles.picker}
            onValueChange={(value, idx) => setStore(value)}>
            <Picker.Item style={styles.text} label="Java" value="java" />
            <Picker.Item style={styles.text} label="JavaScript" value="js" />
          </Picker>
        </View>
      </View>

      <View style={styles.pickerBox}>
        <Text style={styles.text}>구역</Text>
        <View style={styles.pickerItem}>
          <Picker
            mode="dropdown"
            dropdownIconColor="black"
            selectedValue={store}
            style={styles.picker}
            onValueChange={(value, idx) => setStore(value)}>
            <Picker.Item style={styles.text} label="Java" value="java" />
            <Picker.Item style={styles.text} label="JavaScript" value="js" />
          </Picker>
        </View>
      </View>

      <View style={styles.pickerBox}>
        <Text style={styles.text}>난이도</Text>
        <View style={styles.pickerItem}>
          <Picker
            mode="dropdown"
            dropdownIconColor="black"
            selectedValue={store}
            style={styles.picker}
            onValueChange={(value, idx) => setStore(value)}>
            <Picker.Item style={styles.text} label="Java" value="java" />
            <Picker.Item style={styles.text} label="JavaScript" value="js" />
          </Picker>
        </View>
      </View>

      <View style={styles.pickerBox}>
        <Text style={styles.text}>홀드 색상</Text>
        <View style={styles.pickerItem}>
          <Picker
            mode="dropdown"
            dropdownIconColor="black"
            selectedValue={store}
            style={styles.picker}
            onValueChange={(value, idx) => setStore(value)}>
            <Picker.Item style={styles.text} label="Java" value="java" />
            <Picker.Item style={styles.text} label="JavaScript" value="js" />
          </Picker>
        </View>
      </View>

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
          <Text style={styles.checkText}>
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
  checkText: {
    color: 'black',
    fontSize: 14,
    backgroundColor: 'white',
  },
  pickerBox: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBox: {},
  text: {
    color: 'black',
    fontSize: 14,
  },
  pickerItem: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '70%',
    height: 50,
  },
  picker: {},
  pickerText: {
    color: 'black',
    fontSize: 14,
  },
});

export default SearchScreen;
