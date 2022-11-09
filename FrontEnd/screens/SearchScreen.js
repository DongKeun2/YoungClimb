import React, {useState, useRef, useCallback, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Image,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import {debounce} from 'lodash';

import CustomMainHeader from '../components/CustomMainHeader';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {Toast} from '../components/Toast';
import {holdList, YCLevelColorDict} from '../assets/info/ColorInfo';
import UserAvatar from '../components/UserAvatar';

import {fetchUser, searchUser, search} from '../utils/slices/SearchSlice';

import SearchBtnIcon from '../assets/image/search/searchBtn.svg';
import UserIcon from '../assets/image/search/user.svg';
import UserActiveIcon from '../assets/image/search/userA.svg';
import BoardIcon from '../assets/image/search/hold.svg';
import BoardActiveIcon from '../assets/image/search/holdA.svg';
import Checked from '../assets/image/main/checked.svg';
import UnChecked from '../assets/image/main/unchecked.svg';
import searchInputIcon from '../assets/image/profile/searchIcon.png';
import HoldIcon from '../assets/image/hold/hold.svg';

function SearchScreen({navigation}) {
  const [type, setType] = useState('board');
  const [exitAttempt, setExitAttempt] = useState(false);
  const routeName = useRoute();
  const toastRef = useRef(null);
  const onPressExit = useCallback(() => {
    toastRef.current.show('앱을 종료하려면 뒤로가기를 한번 더 눌러주세요');
  }, []);

  const backAction = () => {
    if (routeName.name !== '검색') {
      navigation.goBack();
      return true;
    } else {
      if (!exitAttempt) {
        setExitAttempt(true);
        setTimeout(() => {
          setExitAttempt(false);
        }, 2000);
        onPressExit();
        return true;
      } else {
        BackHandler.exitApp();
        return true;
      }
    }
  };

  useEffect(() => {
    BackHandler.removeEventListener('hardwareBackPress');
  }, []);

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => {
      backHandler.remove();
    };
  });

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
      <Toast ref={toastRef} />
    </SafeAreaView>
  );
}

// 게시글 검색
function BoardTab({navigation}) {
  const dispatch = useDispatch();

  const centerInfo = useSelector(state => state.center.centerInfo);

  const [isSimilar, setIsSimilar] = useState(false);
  const [center, setCenter] = useState('');
  const [wall, setWall] = useState('');
  const [level, setLevel] = useState('');
  const [holdColor, setHoldColor] = useState('');

  function onSubmitSearch() {
    if (!center) {
      return alert('지점을 선택해주세요');
    } else if (!level) {
      return alert('난이도를 선택해주세요.');
    } else if (!holdColor) {
      return alert('홀드 색상을 선택해주세요.');
    } else {
      const data = {
        center,
        wall,
        level,
        holdColor,
        isSimilar,
      };
      dispatch(search(data)).then(() => {
        navigation.navigate('검색 결과', {
          center: centerInfo[center - 1]?.name,
          wall,
          level,
          holdColor,
        });
      });
    }
  }

  function onChangeCenter(value) {
    setCenter(value);
    setWall('');
    setLevel('');
    setHoldColor('');
  }

  return (
    <>
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
              {centerInfo?.map((item, idx) => (
                <Picker.Item
                  key={idx}
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
      </View>
      <View style={styles.checkGroup}>
        {isSimilar ? (
          <TouchableOpacity
            onPress={() => {
              setIsSimilar(false);
            }}>
            <Checked width={20} height={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsSimilar(true);
            }}>
            <UnChecked width={20} height={20} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            setIsSimilar(!isSimilar);
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

// 유저 검색
function UserTab({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(undefined);
  const [first, setFirst] = useState(true);
  const [result, setResult] = useState('');

  const starUsers = useSelector(state => state.search.starUsers);
  const users = useSelector(state => state.search.users);

  const mockApiCall = useMemo(
    () =>
      debounce(async (result, waitingTime = 300) => {
        setResult('');
        setLoading(true);
        if (keyword) {
          await new Promise(resolve => setTimeout(resolve, waitingTime));

          const data = {keyword};
          dispatch(searchUser(data)).then(() => {
            setResult(keyword);
            setFirst(true);
            setLoading(false);
          });
        } else {
          setResult('');
          setFirst(true);
          setLoading(false);
        }
      }, 500),
    [keyword, dispatch],
  );

  useEffect(() => {
    console.log(keyword);

    mockApiCall(keyword); // call the debounced function

    return () => {
      mockApiCall.cancel(); // cancel the debounced function
    };
  }, [mockApiCall, keyword]);

  return (
    <>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="닉네임을 검색하세요."
          placeholderTextColor={'#ADADAD'}
          value={keyword}
          onChangeText={value => {
            setKeyword(value);
          }}
        />
        <Image style={styles.searchIcon} source={searchInputIcon} />
      </View>

      <View style={styles.searchUserResultBox}>
        {loading ? (
          <View>
            <Text style={styles.searchText}>검색 중</Text>
          </View>
        ) : keyword && result ? (
          users?.length ? (
            <View>
              <Text style={styles.searchText}>'{result}'</Text>

              <CardList users={users} navigation={navigation} />
            </View>
          ) : (
            <Text style={styles.text}>검색 결과 없음</Text>
          )
        ) : (
          <View>
            <Text style={styles.text}> 추천 유저</Text>
            <CardList users={starUsers} navigation={navigation} />
          </View>
        )}
      </View>
    </>
  );
}

function CardList({users, navigation}) {
  return (
    <>
      <View style={styles.articleContainer}>
        {users?.map((user, i) => {
          return (
            <UserCard key={user.nickname} user={user} navigation={navigation} />
          );
        })}
      </View>
    </>
  );
}

function UserCard({user, navigation}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('서브프로필', {
          initial: false,
          nickname: user.nickname,
        });
      }}
      style={styles.cardContainer}>
      <View style={styles.cardBox}>
        <UserAvatar source={{uri: user.image}} size={70} />
        <View style={styles.userInfoBox}>
          <Text style={styles.cardNickname}>{user.nickname}</Text>
          <HoldIcon
            width={15}
            height={15}
            color={YCLevelColorDict[user.rank]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  textBox: {},
  text: {
    color: 'black',
    fontSize: 14,
  },
  pickerItem: {
    width: '70%',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  picker: {
    width: '100%',
    color: 'black',
  },
  nonePick: {
    color: '#ADADAD',
  },
  pickerPlaceHold: {
    backgroundColor: 'white',
    color: '#ADADAD',
    fontSize: 14,
  },
  pickerLabel: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 14,
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
    marginTop: '15%',
  },
  btnText: {
    color: 'white',
  },
  searchBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  searchInput: {
    width: '90%',
    borderWidth: 1,
    borderBottomColor: '#464646',
    borderRadius: 10,
    fontSize: 14,
    padding: 5,
    paddingLeft: 40,
    color: 'black',
  },
  searchIcon: {
    position: 'absolute',
    top: 7,
    left: '7%',
  },
  searchText: {
    color: 'black',
  },
  articleContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    display: 'flex',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  cardBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
  InfoBox: {alignItems: 'flex-start', justifyContent: 'center', padding: 1},
  cardInfo: {
    display: 'flex',
    flexDirection: 'row',
    padding: 1,
  },
  userInfoBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardNickname: {
    color: 'black',
    fontSize: 12,
    marginRight: 3,
  },
  searchUserResultBox: {width: '90%'},
});

export default SearchScreen;
