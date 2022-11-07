/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import CustomSubHeader from '../../components/CustomSubHeader';

import {postAdd} from '../../utils/slices/PostSlice';

import {holdList} from '../../assets/info/ColorInfo';
import centerInfo from '../../assets/info/CenterInfo';
import CalendarIcon from '../../assets/image/feed/calendarIcon.svg';

function PostAddInfoScreen({navigation}) {
  const dispatch = useDispatch();

  const [center, setCenter] = useState('');
  const [wall, setWall] = useState('');
  const [level, setLevel] = useState('');
  const [holdColor, setHoldColor] = useState('');
  const [solvedDate, setSolvedDate] = useState(null);
  const [content, setContent] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  function onChangeCenter(value) {
    setCenter(value);
    setWall('');
    setLevel('');
    setHoldColor('');
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setSolvedDate(date);
    hideDatePicker();
  };

  function onPostAdd () {
    if (!center) {
      return alert('지점을 선택해주세요');
    } else if (!level) {
      return alert('난이도를 선택해주세요');
    } else if (!holdColor) {
      return alert('홀드 색상을 선택해주세요');
    } else if (!solvedDate) {
      return alert('풀이 날짜를 선택해주세요');
    } else {
      const formdata = new FormData();
      const data = {
        centerId: center,
        wallId: wall,
        centerLevelId: level,
        holdColor: holdColor,
        solvedDate: solvedDate,
        content: content,
        memberId: 1, // 임시
      };
      console.log(data);
      dispatch(postAdd(data)).then(() => {
        alert('생성완료');
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomSubHeader title="정보 입력" navigation={navigation} />
      <Text>정보 입력</Text>
      <View style={styles.selectContainer}>
        <View style={styles.box}>
          <Text style={styles.text}>
            지점<Text style={{color: '#F34D7F'}}> *</Text>
          </Text>
          <View style={styles.pickerItem}>
            <Picker
              mode="dropdown"
              dropdownIconColor="black"
              selectedValue={center}
              style={center ? styles.picker : styles.nonePick}
              onValueChange={(value, idx) => onChangeCenter(value)}>
              <Picker.Item
                style={styles.pickerPlaceHold}
                label="선택 없음"
                value=""
              />
              {centerInfo.map((item, id) => (
                <Picker.Item
                  key={id}
                  style={styles.pickerLabel}
                  label={item.name}
                  value={item.id}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>구역</Text>
          <View style={styles.pickerItem}>
            <Picker
              mode="dropdown"
              dropdownIconColor={center ? 'black' : '#a7a7a7'}
              selectedValue={wall}
              enabled={center ? true : false}
              style={wall ? styles.picker : styles.nonePick}
              onValueChange={(value, idx) => setWall(value)}>
              <Picker.Item
                style={styles.pickerPlaceHold}
                label={center ? '선택 없음' : '지점을 먼저 선택해주세요'}
                value=""
              />
              {center
                ? centerInfo[center - 1]?.sector.map((item, id) => (
                    <Picker.Item
                      key={id}
                      style={styles.pickerLabel}
                      label={item.name}
                      value={item.id}
                    />
                  ))
                : null}
            </Picker>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>
            난이도<Text style={{color: '#F34D7F'}}> *</Text>
          </Text>
          <View style={styles.pickerItem}>
            <Picker
              mode="dropdown"
              dropdownIconColor={center ? 'black' : '#a7a7a7'}
              selectedValue={level}
              enabled={center ? true : false}
              style={level ? styles.picker : styles.nonePick}
              itemStyle={styles.item}
              onValueChange={(value, idx) => setLevel(value)}>
              <Picker.Item
                style={styles.pickerPlaceHold}
                label={center ? '선택 없음' : '지점을 먼저 선택해주세요'}
                value=""
              />
              {center
                ? centerInfo[center - 1]?.level.map((item, id) => (
                    <Picker.Item
                      key={id}
                      style={styles.pickerLabel}
                      label={item.name}
                      value={item.id}
                    />
                  ))
                : null}
            </Picker>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>
            홀드 색상<Text style={{color: '#F34D7F'}}> *</Text>
          </Text>
          <View style={styles.pickerItem}>
            <Picker
              mode="dropdown"
              dropdownIconColor={center ? 'black' : '#a7a7a7'}
              selectedValue={holdColor}
              enabled={center ? true : false}
              style={holdColor ? styles.picker : styles.nonePick}
              onValueChange={(value, idx) => setHoldColor(value)}>
              <Picker.Item
                style={styles.pickerPlaceHold}
                label={center ? '선택 없음' : '지점을 먼저 선택해주세요'}
                value=""
              />
              {center
                ? holdList.map(item => {
                    return (
                      <Picker.Item
                        key={item}
                        style={styles.pickerLabel}
                        label={item}
                        value={item}
                      />
                    );
                  })
                : null}
            </Picker>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>
            풀이 날짜<Text style={{color: '#F34D7F'}}> *</Text>
          </Text>
          <TouchableOpacity style={styles.dateBox} onPress={showDatePicker}>
            {solvedDate ? (
              <Text style={styles.text}>
                {solvedDate.getFullYear() +
                  '-' +
                  (solvedDate.getMonth() + 1) +
                  '-' +
                  solvedDate.getDate()}
              </Text>
            ) : (
              <Text style={styles.pickerPlaceHold}>날짜를 선택해주세요</Text>
            )}
            <CalendarIcon />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
          />
        </View>

        <View style={{width: '80%', marginTop: 20}}>
          <TextInput
            style={styles.introInput}
            placeholder="본문을 작성해주세요 :)"
            placeholderTextColor={'#a7a7a7'}
            multiline={true}
            textAlignVertical="top"
            onChangeText={value => setContent(value)}
          />
        </View>
      </View>

      <TouchableOpacity onPress={onPostAdd} style={styles.button}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
          업로드
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selectContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: '15%',
  },
  box: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateBox: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: 'black',
    marginVertical: 15,
    paddingHorizontal: '5%',
    paddingTop: 5,
    paddingBottom: 8,
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  pickerItem: {
    width: '70%',
    borderBottomWidth: 0.8,
    borderColor: 'black',
  },
  picker: {
    width: '100%',
    color: 'black',
  },
  nonePick: {
    color: '#a7a7a7',
  },
  pickerPlaceHold: {
    backgroundColor: 'white',
    color: '#a7a7a7',
    fontSize: 14,
  },
  pickerLabel: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 14,
  },
  button: {
    display: 'flex',
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: '80%',
    height: 40,
    backgroundColor: '#F34D7F',
    marginTop: '15%',
  },
  introInput: {
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'black',
    color: 'black',
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 8,
    height: 80,
  },
});

export default PostAddInfoScreen;
