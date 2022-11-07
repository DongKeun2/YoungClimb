import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';

import {FlatList, BackHandler, View, StyleSheet, TouchableOpacity} from 'react-native';
import CustomMainHeader from '../../components/CustomMainHeader';
import HomeFeed from '../../components/HomeFeed';

import {Toast} from '../../components/Toast';
import DeclareSheet from '../../components/DeclareSheet';

const boards = [
  {
    id: 1,
    createUser: {
      nickname: 'climb_june',
      image: null,
      rank: 'Y5',
    },
    createdAt: '2시간 전',
    centerName: '더 클라임 양재점',
    centerLevelColor: '파랑',
    mediaPath:
      'https://s3.ap-northeast-2.amazonaws.com/youngclimb/boardImg/406d78de-790e-4437-b438-a15c6c1ca593.mp4',
    wallName: '',
    difficulty: 'V3',
    holdColor: '빨강',
    solvedDate: '2022.10.21',
    content:
      '대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다. 모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을 박탈당하지 아니한다. 모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다. 타인의 범죄행위로 인하여 생명·신체에 대한 피해를 받은 국민은 법률이 정하는 바에 의하여 국가로부터 구조를 받을 수 있다.',
    like: 96,
    view: 316,
    isFollow: true,
    isLiked: true,
    isScrap: false,
    commentNum: 2753,
    commentPreview: {
      nickname: '아그작냠냠',
      comment:
        '개쩌네... 어떻게 했냐 으아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아ㅏ앙',
    },
  },
  {
    id: 2,
    createUser: {
      nickname: '0_climb',
      image: null,
      rank: 'Y2',
    },
    createdAt: '3시간 전',
    centerName: '더 클라임 강남점',
    centerLevelColor: '초록',
    mediaPath:
      'https://s3.ap-northeast-2.amazonaws.com/youngclimb/boardImg/52cafc61-e0f5-4e5d-9f0b-343be1b06042.mp4',
    wallName: 'C구역',
    difficulty: 'V2',
    holdColor: '노랑',
    solvedDate: '2022.10.20',
    content: 'qwertyuiopasdfghjklzxcvbnm',
    like: 27,
    view: 229,
    isFollow: true,
    isLiked: false,
    isScrap: false,
    commentNum: 22,
    commentPreview: {nickname: 'climb_june', comment: '집 가~~'},
  },
  {
    id: 3,
    createUser: {
      nickname: 'YoungClimb_YoungJunK',
      image: null,
      rank: 'Y1',
    },
    createdAt: '5시간 전',
    centerName: '더 클라임 양재점',
    centerLevelColor: '초록',
    mediaPath:
      'https://s3.ap-northeast-2.amazonaws.com/youngclimb/boardImg/0f446944-8243-452d-b89b-7204e3fe446b.mp4',
    wallName: 'D구역',
    difficulty: 'V1',
    holdColor: '검정',
    solvedDate: '2022.09.24',
    content:
      'T1이 이기겠지..? 이길거야 징동 T1 무서워했다며.. 실력으로 보여줄거야 구마유시 믿는다 황마유시 대상혁도 나오면 더 좋고ㅎ 진짜 무조건 이겨야 해 그래야 Lck 내전 본다~',
    like: 968,
    view: 3160,
    isFollow: true,
    isLiked: false,
    isScrap: true,
    commentNum: 1557,
    commentPreview: {nickname: '0_climb', comment: '무조건 이기지~!!!'},
  },
  {
    id: 4,
    createUser: {
      nickname: '내 닉네임은 띄어쓰기가 가능하지',
      image: null,
      rank: 'Y4',
    },
    createdAt: '3월 16일',
    centerName: '더 클라임 신림점',
    centerLevelColor: '빨강',
    mediaPath:
      'https://s3.ap-northeast-2.amazonaws.com/youngclimb/boardImg/258683be-f3b5-477d-abaa-9d99dfb6d35b.mp4',
    wallName: 'B구역',
    difficulty: 'V5',
    holdColor: '핑크',
    solvedDate: '2022.02.22',
    content:
      '다음주 밥 맛있었으면 좋겠다... ㄹㅇ 고깃집마무리볶음밥 기대중 아니기만 해봐 바로 탈주해서 고깃집 간다 바로 삼겹살 3인분에 볶음밥 2개',
    like: 172,
    view: 438,
    isFollow: true,
    isLiked: true,
    isScrap: true,
    commentNum: 105,
    commentPreview: {nickname: '볶음밥은 사랑입니다', comment: '같이 ㄱㄱ'},
  },
];

function HomeScreen({navigation, route}) {
  const [visablePostIndex, setVisablePostIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false)
  const [focusedContent, setFocusedContent] = useState(null)
  const [closeSignal, setCloseSignal] = useState(0)

  const onViewRef = useRef(({viewableItems}) => {
    if (viewableItems && viewableItems[0]) {
      const index = viewableItems[0].index;
      if (typeof index === 'number') {
        setVisablePostIndex(index);
      }
    } else {
      setVisablePostIndex(-1);
    }
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const [exitAttempt, setExitAttempt] = useState(false);
  const routeName = useRoute();
  const toastRef = useRef(null);
  const onPressExit = useCallback(() => {
    toastRef.current.show('앱을 종료하려면 뒤로가기를 한번 더 눌러주세요');
  }, []);

  const backAction = () => {
    if (routeName.name !== '홈') {
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
    let isBackHandler = true;
    if (isBackHandler) {
      BackHandler.removeEventListener('hardwareBackPress');
    }
    return () => {
      isBackHandler = false;
    };
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
    <View style={{height:'100%', position:'relative'}}>
      <CustomMainHeader type="홈" navigation={navigation} />
      <FlatList
        data={boards}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => (
          <HomeFeed
            feed={item}
            isRecommend={false}
            navigation={navigation}
            isViewable={index === visablePostIndex}
            setModalVisible={setModalVisible}
            setFocusedContent={setFocusedContent}
          />
        )}
      />
      <Toast ref={toastRef} />
      {modalVisible? <TouchableOpacity style={{...styles.background}} onPress={()=>setCloseSignal(closeSignal+1)}></TouchableOpacity> : <></>}
      <DeclareSheet navigation={navigation} route={route} modalVisible={modalVisible} setModalVisible={setModalVisible} focusedContent={focusedContent} closeSignal={closeSignal}/>

    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  background:{
    height:'100%',
    width:'100%',
		position:'absolute',
		bottom:0,
		left:0,
		zIndex:2,

	},
})