/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import CustomSubHeader from '../../components/CustomSubHeader';

import UserAvatar from '../../components/UserAvatar';
import HoldLabel from '../../components/HoldLabel';
import LevelLabel from '../../components/LevelLabel';
import Comment from '../../components/Comment';

import avatar from '../../assets/image/initial/background.png';
import HoldIcon from '../../assets/image/hold/hold.svg';

import {YCLevelColorDict} from '../../assets/info/ColorInfo';

function PostScreen({navigation, route}) {
  const data = {
    //   isfollow: false,
    //   board: {
    //     id: ,
    //     createUser: ,
    //     createdAt: ,  // 텍스트로 보내주기
    //                   // 예시
    //                   //	방금 : 생성부터 10분까지
    //                   //	n분 전 : 10분 지나고 1시간 전까지
    //                   //	n시간 전 : 하루 전까지
    //                   //	3월 16일 : 그 이전 생성, 이번년도이면
    //                   //	2021년 3월 16일 : 그 이전 생성, 이번년도 이전이면
    //     centerId: ,
    //     centerName: , // '더 클라임 양재점'
    //     centerLevelId: ,
    //     centerLevelColor: , // 'blue'
    //     wallId: ,
    //     wallName: , // 'A구역'
    //     centerLevelId: ,
    //     mediaId: '썸네일 혹은 정지 동영상',
    //     difficulty: , // 'V3'
    //     holdColor: , // 'red'
    //     solvedDate: , // '2022.10.22'
    //     content: ,
    //   },
    comments: [
      {
        id: 1,
        user: {
          nickname: '아그작냠냠',
          image: null,
          rank: 'Y7',
        },
        content: '와 대박... 나도 잘하고 싶다ㅠㅠ',
        isLiked: true,
        createdAt: '2시간 전',
        reComment: [
          {
            user: {
              nickname: 'climb_june',
              image: null,
              rank: 'Y3',
            },
            content: '너도 할 수 있어',
            createdAt: '1시간 전',
          },
          {
            user: {
              nickname: '0_climb',
              image: null,
              rank: 'Y2',
            },
            content: '내일 같이 가자',
            createdAt: '1시간 전',
          },
        ],
      },
      {
        id: 2,
        user: {
          nickname: 'climb_YoungJun',
          image: null,
          rank: 'Y4',
        },
        content:
          '집 가고 싶다 집 가고 싶다 집 가고 싶다 집 가고 싶다 집 가고 싶다 집 가고 싶다',
        isLiked: false,
        createdAt: '5시간 전',
        reComment: [
          {
            user: {
              nickname: '0_climb',
              image: null,
              rank: 'Y6',
            },
            content:
              '나도 집 가고 싶다 나도 집 가고 싶다 나도 집 가고 싶다 나도 집 가고 싶다 나도 집 가고 싶다 나도 집 가고 싶다',
            createdAt: '2시간 전',
          },
        ],
      },
      {
        id: 3,
        user: {
          nickname: '내 닉네임은 띄어쓰기가 가능하지',
          image: null,
          rank: 'Y5',
        },
        content: '내일 점심 뭐냐 너무 궁금하네 갑자기',
        isLiked: true,
        createdAt: '2시간 전',
        reComment: [],
      },
      {
        id: 4,
        user: {
          nickname: 'abcdefghijklmnopqrstuvwxyz',
          image: null,
          rank: 'Y1',
        },
        content:
          'dgalghksjlblgasuhtpwtafiuhsdiufhsduifusdffsduifhsdicczfwefwefwef',
        isLiked: true,
        createdAt: '3월 16일',
        reComment: [
          {
            user: {
              nickname: '아그작',
              image: null,
              rank: 'Y4',
            },
            content: '?',
            createdAt: '23시간 전',
          },
        ],
      },
    ],
  };
  return (
    <>
      <CustomSubHeader title="댓글" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* 피드 상단 헤더 */}
          <View style={styles.feedHeader}>
            <View style={styles.headerTop}>
              <View style={styles.iconText}>
                <UserAvatar source={avatar} size={36} />
                <View style={styles.headerTextGroup}>
                  <View style={{...styles.iconText, alignItems: 'center'}}>
                    <Text
                      style={{
                        ...styles.feedTextStyle,
                        fontSize: 16,
                        fontWeight: '600',
                        marginRight: 5,
                      }}>
                      {route.params.board.createUser.nickname}
                    </Text>
                    <HoldIcon
                      width={18}
                      height={18}
                      color={
                        YCLevelColorDict[route.params.board.createUser.rank]
                      }
                    />
                  </View>
                  <Text style={{...styles.feedTextStyle, fontSize: 12}}>
                    {route.params.board.createdAt}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.wallInfo}>
              <Text style={{...styles.feedTextStyle, marginRight: 8}}>
                {route.params.board.centerName}
              </Text>
              <Text style={{...styles.feedTextStyle, marginRight: 8}}>
                {route.params.board.wallName}
              </Text>
              <Text style={{...styles.feedTextStyle, marginRight: 3}}>
                {route.params.board.difficulty}
              </Text>
              <LevelLabel color={route.params.board.centerLevelColor} />
              <HoldLabel color={route.params.board.holdColor} />
            </View>
          </View>
          {/* 본문 */}
          <View style={styles.contentSummary}>
            <Text style={styles.contentPreview}>
              {route.params.board.content}
            </Text>
          </View>
        </View>
        {data.comments.map((comment, idx) => {
          return (
            <Comment key={idx} comment={comment} navigation={navigation} />
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 0.2,
    borderColor: 'black',
    paddingBottom: 8,
  },
  feedHeader: {
    margin: 8,
  },
  headerTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconText: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerTextGroup: {
    marginLeft: 8,
    display: 'flex',
    justifyContent: 'space-between',
  },
  feedTextStyle: {
    color: 'black',
    fontSize: 14,
  },
  wallInfo: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
  },
  solvedDate: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  popularInfo: {
    marginTop: 8,
    marginHorizontal: 8,
  },
  likeGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentSummary: {
    marginVertical: 3,
    marginHorizontal: 10,
  },
  contentPreview: {
    color: 'black',
    fontSize: 14,
    overflow: 'hidden',
  },
  commentSummary: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  commentPreview: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default PostScreen;
