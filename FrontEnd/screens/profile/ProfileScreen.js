import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';

import CustomMainHeader from '../../components/CustomMainHeader';
import UserAvatar from '../../components/UserAvatar';
import ArticleCard from '../../components/ArticleCard';
import FollowBtn from '../../components/FollowBtn';

import rankIcon from '../../assets/image/profile/holdIcon.png';
import boardIcon from '../../assets/image/profile/board.png';
import boardActiveIcon from '../../assets/image/profile/boardA.png';
import bookmarkIcon from '../../assets/image/profile/bookmark.png';
import bookmarkActiveIcon from '../../assets/image/profile/bookmarkA.png';

function ProfileScreen({navigation}) {
  const userInfo = useSelector(state => state.profile.profileInfo.user);
  const isFollow = useSelector(state => state.profile.profileInfo.isFollow);
  const isMine = useSelector(state => state.profile.profileInfo.isMine);

  const [type, setType] = useState('board');
  const boards = useSelector(state => state.profile.boards);
  const scraps = useSelector(state => state.profile.scraps);

  return (
    <ScrollView style={styles.container}>
      <CustomMainHeader type="프로필" navigation={navigation} />
      <View style={styles.header}>
        <View style={styles.profileBox}>
          <UserAvatar source={userInfo.image} size={70} />
          <View style={styles.profileTextBox}>
            <Text style={styles.profileNickname}>{userInfo.nickname}</Text>
            <Text style={[styles.text, styles.profileSize]}>
              {userInfo.gender} {userInfo.height}cm {userInfo.shoeSize}mm{' '}
              {userInfo.wingspan}cm
            </Text>
          </View>
        </View>
        <FollowBtn
          isFollow={isFollow}
          isMine={isMine}
          nickname={userInfo.nickname}
        />
      </View>

      <View style={styles.introBox}>
        <Text style={styles.intro}>{userInfo.intro}</Text>
      </View>

      <View style={styles.horizonLine} />

      <View style={styles.InfoContainer}>
        <View style={styles.InfoBox}>
          <Text style={styles.text}>등급</Text>
          <Image style={styles.rankImg} source={rankIcon} />
        </View>
        <View style={styles.InfoBox}>
          <Text style={styles.text}>게시글</Text>
          <Text style={styles.text}>{userInfo.boardNum}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('팔로우');
          }}
          style={styles.InfoBox}>
          <Text style={styles.text}>팔로잉</Text>
          <Text style={styles.text}>{userInfo.followingNum}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('팔로우');
          }}
          style={styles.InfoBox}>
          <Text style={styles.text}>팔로워</Text>
          <Text style={styles.text}>{userInfo.followerNum}</Text>
        </TouchableOpacity>
      </View>

      {type === 'board' ? (
        <View style={styles.tabBox}>
          <TouchableOpacity onPress={() => {}} style={styles.activeTab}>
            <Image source={boardActiveIcon} style={styles.tabIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setType('scrap');
            }}
            style={styles.tabBtn}>
            <Image source={bookmarkIcon} style={styles.tabIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.tabBox}>
          <TouchableOpacity
            onPress={() => {
              setType('board');
            }}
            style={styles.tabBtn}>
            <Image source={boardIcon} style={styles.tabIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.activeTab}>
            <Image source={bookmarkActiveIcon} style={styles.tabIcon} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.horizonLine} />

      <CardList
        navigation={navigation}
        articles={type === 'board' ? boards : scraps}
      />
    </ScrollView>
  );
}

function CardList({articles, navigation}) {
  return (
    <>
      <View style={styles.articleContainer}>
        {articles.map((article, i) => {
          console.log(article);
          return (
            <ArticleCard key={i} article={article} navigation={navigation} />
          );
        })}
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
  header: {
    alignSelf: 'center',
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileTextBox: {
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  profileNickname: {
    color: 'black',
    // paddingVertical: 5,
  },
  profileSize: {
    paddingVertical: 5,
  },
  introBox: {
    width: '100%',
    paddingLeft: 10,
    alignSelf: 'flex-start',
    margin: 10,
  },
  horizonLine: {
    borderColor: 'black',
    borderWidth: 0.2,
    width: '100%',
    height: 0,
  },
  InfoContainer: {
    width: '100%',
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 3,
  },
  InfoBox: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rankImg: {
    width: 20,
    height: 16,
  },
  tabBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  tabBtn: {
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activeTab: {
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  articleContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    color: 'black',
  },
  intro: {
    color: 'black',
  },
});

export default ProfileScreen;
