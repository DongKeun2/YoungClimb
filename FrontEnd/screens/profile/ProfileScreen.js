import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler
} from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import CustomMainHeader from '../../components/CustomMainHeader';
import CustomSubHeader from '../../components/CustomSubHeader';
import UserAvatar from '../../components/UserAvatar';
import ArticleCard from '../../components/ArticleCard';
import FollowBtn from '../../components/FollowBtn';
import RankInfo from '../../components/RankInfo';

import {profile, setIsClose} from '../../utils/slices/ProfileSlice';
import {logout, testLogin} from '../../utils/slices/AccountsSlice';

import rankIcon from '../../assets/image/profile/holdIcon.png';
import boardIcon from '../../assets/image/profile/board.png';
import boardActiveIcon from '../../assets/image/profile/boardA.png';
import bookmarkIcon from '../../assets/image/profile/bookmark.png';
import bookmarkActiveIcon from '../../assets/image/profile/bookmarkA.png';
import { Toast } from '../../components/Toast';

function ProfileScreen({navigation, route}) {
  const [exitAttempt, setExitAttempt] = useState(false)
  const routeName = useRoute()
  const toastRef = useRef(null);
  const onPressExit = useCallback(()=>{
      toastRef.current.show("앱을 종료하려면 뒤로가기를 한번 더 눌러주세요");
  }, []);

  const backAction = ()=>{ 
    if (routeName.name !== '메인프로필'){
      navigation.goBack()
      return true
    } else{
      if (!exitAttempt){
        setExitAttempt(true)
        setTimeout(()=>{setExitAttempt(false)}, 2000)
        onPressExit()
        return true
      } else{
        BackHandler.exitApp()
        return true
      }
    }
  }

  useEffect(()=>{
    let isBackHandler = true
    if (isBackHandler){
      BackHandler.removeEventListener('hardwareBackPress')
    }
    return ()=>{ isBackHandler=false }
  },[]
  )
  
  useFocusEffect(()=>{
  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );
  return ()=> {
    backHandler.remove()
  }
   })


  const dispatch = useDispatch();

  const [isRank, setIsRank] = useState(false);
  const isOpen = useSelector(state => state.profile.isOpen);

  const userInfo = useSelector(state => state.profile.profileInfo.user);
  const isFollow = useSelector(state => state.profile.profileInfo.isFollow);
  const isMine = useSelector(state => state.profile.profileInfo.isMine);

  const [type, setType] = useState('board');
  const boards = useSelector(state => state.profile.profileInfo.boards);
  const scraps = useSelector(state => state.profile.profileInfo.scraps);

  // YC에서 initialparams 지정
  useEffect(() => {
    // dispatch(profile(route.params.nickname));
  });

  return (
    <>
      {route.params.initial ? (
        <CustomMainHeader type="프로필" navigation={navigation} />
      ) : (
        <CustomSubHeader
          title={`${userInfo.nickname}`}
          navigation={navigation}
        />
      )}

      {route.params.initial && isOpen && (
        <View style={isOpen ? [styles.menu, styles.active] : styles.menu}>
          <TouchableOpacity
            onPress={() => {
              // dispatch(logout());
              dispatch(testLogin(false));
            }}>
            <Text style={styles.text}>로그아웃</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('프로필 설정')}>
            <Text style={styles.text}>정보 수정</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView style={styles.container}>
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
          {!isOpen && (
            <FollowBtn
              isFollow={isFollow}
              isMine={isMine}
              nickname={userInfo.nickname}
            />
          )}
        </View>

        <View style={styles.introBox}>
          <Text style={styles.intro}>{userInfo.intro}</Text>
        </View>

        <View style={styles.horizonLine} />

        {isRank ? (
          // 랭크 정보 로그인 한 회원의 rank로 수정해야함.
          <RankInfo
            setIsRank={setIsRank}
            rank={userInfo.rank}
            exp={userInfo.exp}
          />
        ) : (
          <>
            <View style={styles.InfoContainer}>
              <TouchableOpacity
                style={styles.InfoBox}
                onPress={() => setIsRank(true)}>
                <Text style={styles.text}>등급</Text>
                <Image style={styles.rankImg} source={rankIcon} />
              </TouchableOpacity>
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
          </>
        )}
      </ScrollView>
      <Toast ref={toastRef}/>
    </>
  );
}

function CardList({articles, navigation}) {
  return (
    <>
      <View style={styles.articleContainer}>
        {articles.map((article, i) => {
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
  menu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    position: 'absolute',
    top: 50,
    zIndex: 1,
    right: 0,
    width: 100,
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    opacity: 0,
    visibility: 'none',
    transform: [{translateY: -20}],
    // transition: ['opacity 0.4s' 'ease', transform 0.4s ease, visibility 0.4s],
    padding: 10,
  },
  active: {
    opacity: 1,
    visibility: 'visible',
    transform: [{translateY: 0}],
  },
});

export default ProfileScreen;
