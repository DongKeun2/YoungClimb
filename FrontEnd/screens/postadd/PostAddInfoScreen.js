/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';

import CustomSubHeader from '../../components/CustomSubHeader';

import {postAdd} from '../../utils/slices/PostSlice';

import {holdList} from '../../assets/info/ColorInfo';
import centerNameInfo from '../../assets/info/CenterNameInfo';
import CalendarIcon from '../../assets/image/feed/calendarIcon.svg';
import CloseIcon from '../../assets/image/header/closeIcon.svg';

import {getVideoPath} from '../../utils/slices/PostSlice';

function PostAddInfoScreen({navigation}) {
  const dispatch = useDispatch();

  const centerInfo = useSelector(state => state.center.centerInfo);

  const uploadVideo = useSelector(state => state.post.uploadVideo);

  const [center, setCenter] = useState('');
  const [wall, setWall] = useState(0);
  const [level, setLevel] = useState('');
  const [holdColor, setHoldColor] = useState('');
  const [solvedDate, setSolvedDate] = useState(null);
  const [content, setContent] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  function onChangeCenter(value) {
    setCenter(value);
    setWall('');
    setLevel('');
    setHoldColor('');
  }

  function clearCenter(e) {
    if (!e) {
      onChangeCenter('');
    }
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

  function onPostAdd() {
    if (!center) {
      return alert('지점을 선택해주세요');
    } else if (!level) {
      return alert('난이도를 선택해주세요');
    } else if (!holdColor) {
      return alert('홀드 색상을 선택해주세요');
    } else if (!solvedDate) {
      return alert('풀이 날짜를 선택해주세요');
    } else {
      setIsLoading(true);
      let formData = new FormData();
      const videoFile = {
        uri: uploadVideo.assets[0].uri,
        name: uploadVideo.assets[0].fileName + '.mp4',
        type: uploadVideo.assets[0].type,
      };
      console.log(videoFile);
      formData.append('file', videoFile);

      dispatch(getVideoPath(formData)).then(res => {
        if (res.type === 'getVideoPath/fulfilled') {
          const data = {
            centerId: center,
            wallId: wall,
            centerLevelId: level,
            holdColor: holdColor,
            solvedDate: solvedDate,
            content: content,
            mediaPath: res.payload,
          };
          console.log(data);
          dispatch(postAdd(data)).then(res => {
            if (res.type === 'postAdd/fulfilled') {
              setIsLoading(false);
              alert('성공적으로 생성되었습니다');
              navigation.popToTop();
            } else {
              setIsLoading(false);
              alert('다시 시도해주세요');
            }
          });
        } else {
          setIsLoading(false);
          alert('다시 시도해주세요');
        }
      });
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CustomSubHeader title="정보 입력" navigation={navigation} />
        <View style={styles.selectContainer}>
          {/* <KeyboardAwareScrollView
        style={styles.selectContainer}
        showsVerticalScrollIndicator={false}> */}
          <View style={styles.box}>
            <Text style={styles.text}>
              지점<Text style={{color: '#F34D7F'}}> *</Text>
            </Text>
            <View style={{...styles.pickerItem, zIndex: 3}}>
              <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                closeOnSubmit={true}
                showChevron={false}
                suggestionsListMaxHeight={260}
                onSelectItem={item => {
                  item && onChangeCenter(item.id);
                }}
                onChangeText={e => clearCenter(e)}
                onClear={e => clearCenter(e)}
                dataSet={centerNameInfo}
                textInputProps={{
                  placeholder: '지점을 입력해주세요',
                  placeholderTextColor: '#a7a7a7',
                  style: {color: 'black', fontSize: 14, marginLeft: 2},
                }}
                inputContainerStyle={{
                  backgroundColor: 'white',
                }}
                ClearIconComponent={
                  <CloseIcon
                    width={16}
                    style={{marginTop: 3, marginRight: 5}}
                  />
                }
                EmptyResultComponent={
                  <Text style={{...styles.text, padding: 16}}>
                    검색 지점이 존재하지 않습니다.
                  </Text>
                }
                emptyResultTextStyle={{color: 'black'}}
              />
              {/* <Picker
              mode="dropdown"
              dropdownIconColor="black"
              selectedValue={center}
              style={center ? styles.picker : styles.nonePick}
              onValueChange={(value, idx) => onChangeCenter(value)}>
              <Picker.Item
                style={styles.pickerPlaceHold}
                label="선택 없음"
                value="" 1
              />
              {centerInfo.map((item, id) => (
                <Picker.Item
                  key={id}
                  style={styles.pickerLabel}
                  label={item.name}
                  value={item.id}
                />
              ))}
            </Picker> */}
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
                  ? centerInfo[center - 1]?.wallList.map((item, idx) => (
                      <Picker.Item
                        key={idx}
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
                  ? centerInfo[center - 1]?.centerLevelList.map((item, idx) => (
                      <Picker.Item
                        key={idx}
                        style={styles.pickerLabel}
                        label={item.color}
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
            <TouchableOpacity
              style={{...styles.dateBox, zIndex: -1}}
              onPress={showDatePicker}>
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
              <CalendarIcon style={{marginRight: -2}} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              maximumDate={new Date()}
            />
          </View>

          <View style={{width: '100%', marginTop: 20}}>
            <TextInput
              style={styles.introInput}
              placeholder="본문을 작성해주세요 :)"
              placeholderTextColor={'#a7a7a7'}
              multiline={true}
              textAlignVertical="top"
              onChangeText={value => setContent(value)}
            />
          </View>
          <TouchableOpacity onPress={onPostAdd} style={styles.button}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
              업로드
            </Text>
          </TouchableOpacity>
          {/* </KeyboardAwareScrollView> */}
        </View>
      </SafeAreaView>
      {isLoading ? (
        <View style={styles.loadingBackGround}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : null}
    </>
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
    width: '80%',
    marginVertical: 20,
    marginHorizontal: 'auto',
  },
  box: {
    width: '100%',
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
    width: '100%',
    height: 50,
    backgroundColor: '#F34D7F',
    marginTop: 30,
    marginBottom: 100,
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
    height: 90,
  },
  loadingBackGround: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});

export default PostAddInfoScreen;
