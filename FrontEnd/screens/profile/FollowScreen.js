import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import CustomSubHeader from '../../components/CustomSubHeader';
import FollowBtn from '../../components/FollowBtn';
import UserAvatar from '../../components/UserAvatar';

import {fetchFollowList} from '../../utils/slices/ProfileSlice';

import searchIcon from '../../assets/image/profile/searchIcon.png';

function FollowScreen({navigation, route}) {
  const dispatch = useDispatch();

  const [type, setType] = useState('');
  const [keyword, setKeyword] = useState('');

  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setType(route.params.type);
    setIsLoading(true);
    if (isFocused) {
      dispatch(fetchFollowList(route.params.nickname)).then(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, route, isFocused]);

  const followings = useSelector(state => state.profile.followInfo?.followings);
  const followers = useSelector(state => state.profile.followInfo?.followers);

  return (
    <>
      {isLoading ? null : (
        <>
          <CustomSubHeader
            title={route.params.nickname}
            navigation={navigation}
          />
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            {type === 'following' ? (
              <View style={styles.tabBox}>
                <TouchableOpacity onPress={() => {}} style={styles.activeTab}>
                  <Text
                    style={[
                      styles.tabFont,
                      {fontWeight: 'bold', color: 'white'},
                    ]}>
                    팔로잉({followings?.length})
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setType('follower');
                  }}
                  style={styles.tabBtn}>
                  <Text style={styles.tabFont}>
                    팔로워({followers?.length})
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.tabBox}>
                <TouchableOpacity
                  onPress={() => {
                    setType('following');
                  }}
                  style={styles.tabBtn}>
                  <Text style={styles.tabFont}>
                    팔로잉({followings?.length})
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}} style={styles.activeTab}>
                  <Text
                    style={[
                      styles.tabFont,
                      {fontWeight: 'bold', color: 'white'},
                    ]}>
                    팔로워({followers?.length})
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.searchBox}>
              <TextInput
                style={styles.searchInput}
                placeholder="닉네임을 검색하세요."
                placeholderTextColor={'#ADADAD'}
                value={keyword}
                onChangeText={value => setKeyword(value)}
              />
              <Image style={styles.searchIcon} source={searchIcon} />
            </View>

            <FollowList
              follows={type === 'following' ? followings : followers}
              type={type}
              keyword={keyword}
              navigation={navigation}
            />
          </ScrollView>
        </>
      )}
    </>
  );
}

function FollowList({follows, keyword, navigation, type}) {
  const searchResult = follows.filter(follow =>
    follow.nickname.includes(keyword),
  );

  return (
    <View style={styles.followContainer}>
      {searchResult.map((item, i) => {
        return (
          <FollowItem
            key={i}
            idx={i}
            type={type}
            item={item}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
}

// 팔로우 버튼에 보내주는 follow 정보 api연결해야함 item.follow
function FollowItem({item, navigation, type, idx}) {
  return (
    <>
      <View style={styles.followItem}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('서브프로필', {
              initial: false,
              nickname: item.nickname,
            });
          }}
          style={styles.followItemInfo}>
          <UserAvatar source={{uri: item.image}} size={45} />
          <View style={styles.profileBox}>
            <Text style={styles.nickname}>{item.nickname}</Text>
            <Text style={styles.text}>
              {item.gender === 'M' ? '남성' : '여성'}{' '}
              {item.height ? `${item.height}cm` : null}{' '}
              {item.shoeSize ? `${item.shoeSize}mm` : null}{' '}
              {item.wingspan ? `윙스팬 ${item.wingspan}cm` : null}
            </Text>
          </View>
        </TouchableOpacity>

        <FollowBtn
          idx={idx}
          type={type}
          follow={item.follow}
          nickname={item.nickname}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
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
  followContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  followItem: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  followItemInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileBox: {
    marginLeft: 5,
  },
  tabFont: {
    fontSize: 15,
    color: 'black',
  },
  nickname: {color: 'black', fontSize: 14, fontWeight: 'bold'},
  text: {color: 'black', fontSize: 12},
});

export default FollowScreen;
