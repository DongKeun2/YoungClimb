import React from 'react';
import {ScrollView} from 'react-native';
import CustomMainHeader from '../../components/CustomMainHeader';
import HomeFeed from '../../components/HomeFeed';

function HomeScreen({navigation}) {
  const boards = [
    {
      id: 1,
      createUser: 'climb_june',
      createdAt: '2시간 전',
      centerName: '더 클라임 양재점',
      centerLevelColor: 'blue',
      mediaId: null,
      wallName: 'A구역',
      difficulty: 'V3',
      holdColor: 'red',
      solvedDate: '2022.10.21',
      content: '대통령이 궐위되거나 사고로 인하여 직무를 수행할 수 없을 때에는 국무총리, 법률이 정한 국무위원의 순서로 그 권한을 대행한다. 모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을 박탈당하지 아니한다. 모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다. 타인의 범죄행위로 인하여 생명·신체에 대한 피해를 받은 국민은 법률이 정하는 바에 의하여 국가로부터 구조를 받을 수 있다.',
      like: 96,
      view: 316,
      isFollow: true,
      isLiked: true,
      isScrap: false,
      commentNum: 2753,
      commentPreview: {nickname: '아그작냠냠', comment: '개쩌네... 어떻게 했냐'},
    },
    {
      id: 2,
      createUser: '0_climb',
      createdAt: '3시간 전',
      centerName: '더 클라임 강남점',
      centerLevelColor: 'green',
      mediaId: null,
      wallName: 'C구역',
      difficulty: 'V2',
      holdColor: 'yellow',
      solvedDate: '2022.10.20',
      content: '집 가고싶다 집 가고싶다 집 가고싶다 집 가고싶다 집 가고싶다 집 가고싶다 집 가고싶다 집 가고싶다 집 가고싶다 집 가고싶다 집 가고싶다 집 가고싶다 집 가고싶다 집 가고싶다 집 가고싶다 집 가고싶다 집 가고싶다  ',
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
      createUser: 'YoungClimb_YoungJunK',
      createdAt: '5시간 전',
      centerName: '더 클라임 양재점',
      centerLevelColor: 'green',
      mediaId: null,
      wallName: 'D구역',
      difficulty: 'V1',
      holdColor: 'black',
      solvedDate: '2022.09.24',
      content: 'T1이 이기겠지..? 이길거야 징동 T1 무서워했다며.. 실력으로 보여줄거야 구마유시 믿는다 황마유시 대상혁도 나오면 더 좋고ㅎ 진짜 무조건 이겨야 해... 지면 안돼 지면 나 울어 월요일에 안 가',
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
      createUser: '내 닉네임은 띄어쓰기가 가능하지',
      createdAt: '3월 16일',
      centerName: '더 클라임 신림점',
      centerLevelColor: 'red',
      mediaId: null,
      wallName: 'B구역',
      difficulty: 'V5',
      holdColor: 'pink',
      solvedDate: '2022.02.22',
      content: '다음주 밥 맛있었으면 좋겠다... ㄹㅇ 고깃집마무리볶음밥 기대중 아니기만 해봐 바로 탈주해서 고깃집 간다 바로 삼겹살 3인분에 볶음밥 2개',
      like: 172,
      view: 438,
      isFollow: true,
      isLiked: true,
      isScrap: true,
      commentNum: 105,
      commentPreview: {nickname: '볶음밥은 사랑입니다', comment: '같이 ㄱㄱ'},
    },
  ];
  return (
    <>
      <CustomMainHeader type="홈" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {boards.map((feed, idx) => {
          return <HomeFeed key={idx} feed={feed} navigation={navigation} />;
        })}
      </ScrollView>
    </>
  );
}

export default HomeScreen;
