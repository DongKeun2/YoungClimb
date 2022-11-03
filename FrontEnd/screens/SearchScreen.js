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
import {holdList, YCLevelColorDict} from '../assets/info/ColorInfo';
import {Toast} from '../components/Toast';

import {searchUser} from '../utils/slices/SearchSlice';

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
  const [isSimilar, setIsSimilar] = useState(false);

  const [isSelectCenter, setIsSelectCenter] = useState(false);

  const [center, setCenter] = useState('');
  const [wall, setWall] = useState('');
  const [level, setLevel] = useState('');
  const [holdColor, setHoldColor] = useState('');

  function onSubmitSearch() {
    navigation.navigate('검색 결과');
  }

  return (
    <>
      <View style={styles.selectContainer}>
        <View style={styles.box}>
          <Text style={styles.text}>지점</Text>
          <View style={styles.pickerItem}>
            <Picker
              mode="dropdown"
              dropdownIconColor="black"
              selectedValue={center}
              style={styles.picker}
              onValueChange={(value, idx) => setCenter(value)}>
              <Picker.Item
                style={styles.pickerText}
                label="Java"
                value="java"
              />
              <Picker.Item
                style={styles.pickerText}
                label="JavaScript"
                value="js"
              />
            </Picker>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>구역</Text>
          <View style={styles.pickerItem}>
            <Picker
              mode="dropdown"
              dropdownIconColor="black"
              selectedValue={wall}
              style={styles.picker}
              onValueChange={(value, idx) => setWall(value)}>
              <Picker.Item
                style={styles.pickerText}
                label="Java"
                value="java"
              />
              <Picker.Item
                style={styles.pickerText}
                label="JavaScript"
                value="js"
              />
            </Picker>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>난이도</Text>
          <View style={styles.pickerItem}>
            <Picker
              mode="dropdown"
              dropdownIconColor="black"
              selectedValue={level}
              style={styles.picker}
              itemStyle={styles.item}
              onValueChange={(value, idx) => setLevel(value)}>
              {holdList.map(item => {
                return (
                  <Picker.Item
                    key={item}
                    style={styles.pickerText}
                    label={item}
                    value={item}
                  />
                );
              })}
            </Picker>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.text}>홀드 색상</Text>
          <View style={styles.pickerItem}>
            <Picker
              // mode="dropdown"
              dropdownIconColor="black"
              selectedValue={holdColor}
              style={styles.picker}
              onValueChange={(value, idx) => setHoldColor(value)}>
              {holdList.map(item => {
                return (
                  <Picker.Item
                    key={item}
                    style={styles.pickerText}
                    label={item}
                    value={item}
                  />
                );
              })}
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

  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(undefined);
  const [first, setFirst] = useState(true);
  const [result, setResult] = useState('');

  const users = useSelector(state => state.search.users);

  const mockApiCall = useMemo(
    () =>
      debounce(async (result, waitingTime = 1000) => {
        setLoading(true);
        if (keyword) {
          await new Promise(resolve => setTimeout(resolve, waitingTime));

          // dispatch(searchUser(keyword)).then(res => {
          //   setResult(res);
          // });

          setResult(keyword);

          setFirst(true);
        } else {
          setResult('');
          setFirst(true);
        }

        setLoading(false);
      }, 500),
    [keyword], // dispatch
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

      {loading ? (
        <Text style={styles.noSearchText}>검색 중</Text>
      ) : keyword ? (
        result ? (
          <View>
            <Text style={styles.noSearchText}>검색 결과 : {result}</Text>
            <CardList users={users} />
          </View>
        ) : first ? null : (
          <View>
            <Text style={styles.noSearchText}>검색결과 없음</Text>
          </View>
        )
      ) : (
        <View>
          <Text style={styles.text}> 추천 유저</Text>
          <CardList users={users} />
        </View>
      )}
    </>
  );
}

function CardList({users, navigation}) {
  return (
    <>
      <View style={styles.articleContainer}>
        {users.map((user, i) => {
          return <ArticleCard key={i} user={user} navigation={navigation} />;
        })}
      </View>
    </>
  );
}

function ArticleCard({user, navigation}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('게시글');
      }}
      style={styles.cardContainer}>
      <View style={styles.cardBox}>
        <Image source={user.image} />
        <Text style={styles.articleText}>{user.nickname}</Text>
        <HoldIcon width={30} height={30} color={YCLevelColorDict[user.rank]} />
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
  pickerText: {
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
    width: '80%',
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
    left: '12%',
  },
  noSearchText: {
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
  articleText: {
    color: 'black',
  },
});

export default SearchScreen;
