import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import CustomSubHeader from '../../components/CustomSubHeader';
import FollowBtn from '../../components/FollowBtn';
import UserAvatar from '../../components/UserAvatar';

import searchIcon from '../../assets/image/profile/searchIcon.png';

function FollowScreen({navigation}) {
  const [type, setType] = useState('following');

  const [keyword, setKeyword] = useState('');

  const followings = useSelector(state => state.profile.followInfo.followings);
  const followers = useSelector(state => state.profile.followInfo.followers);

  return (
    <ScrollView style={styles.container}>
      <CustomSubHeader title="팔로우" navigation={navigation} />

      {type === 'following' ? (
        <View style={styles.tabBox}>
          <TouchableOpacity onPress={() => {}} style={styles.activeTab}>
            <Text
              style={[styles.tabFont, {fontWeight: 'bold', color: 'white'}]}>
              팔로잉({followings?.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setType('follower');
            }}
            style={styles.tabBtn}>
            <Text style={styles.tabFont}>팔로워({followers?.length})</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.tabBox}>
          <TouchableOpacity
            onPress={() => {
              setType('following');
            }}
            style={styles.tabBtn}>
            <Text style={styles.tabFont}>팔로잉({followings?.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.activeTab}>
            <Text
              style={[styles.tabFont, {fontWeight: 'bold', color: 'white'}]}>
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
        keyword={keyword}
        navigation={navigation}
      />
    </ScrollView>
  );
}

function FollowList({follows, keyword, navigation}) {
  const searchResult = follows.filter(follow =>
    follow.nickname.includes(keyword),
  );

  return (
    <View style={styles.followContainer}>
      {searchResult.map((item, i) => {
        return <FollowItem key={i} item={item} navigation={navigation} />;
      })}
    </View>
  );
}

function FollowItem({item, navigation}) {
  return (
    <>
      <View style={styles.followItem}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('서브프로필', {
              initial: false,
              nickname: item.nickname,
            });
          }}
          style={styles.followItemInfo}>
          <UserAvatar source={item.image} size={45} rank={item.rank} />
          <View>
            <Text style={styles.nickname}>{item.nickname}</Text>
            <Text style={styles.text}>
              {item.gender} {item.height}cm {item.shoeSize}mm {item.wingspan}cm
            </Text>
          </View>
        </TouchableOpacity>
        <FollowBtn isFollow={true} />
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
  tabFont: {
    fontSize: 15,
    color: 'black',
  },
  nickname: {color: 'black', fontSize: 14, fontWeight: 'bold'},
  text: {color: 'black', fontSize: 12},
});

export default FollowScreen;
