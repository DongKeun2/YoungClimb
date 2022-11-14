import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotificationList, changeNewNoti } from '../../utils/slices/notificationSlice';
import CustomSubHeader from '../../components/CustomSubHeader';

function NoticeScreen({navigation}) {
  const dispatch = useDispatch()
	const screenWidth = Dimensions.get("screen").width;
  const notifications = useSelector(state => state.notification.notifications);
  
  useEffect(()=>{
    console.log('알림')
    dispatch(fetchNotificationList(1)).then(AsyncStorage.removeItem('newNoti'))
    dispatch(changeNewNoti(false))
  },[])

  // {
  //   "nickname": "민성",
  //   "profileImage": "https://youngclimb.s3.ap-northeast-2.amazonaws.com/userProfile/KakaoTalk_20221108_150615819.png",
  //   "boardId": 4,
  //   "createdAt": "46분 전",
  //   "type": 3
  // },
  //   1 : 팔로우
  // 2 : 게시물 좋아요
  // 3 : 게시물 댓글
  // 4 : 댓글 좋아요
  // 5 : 대댓글
  const noticeDict = {
    1: '님이 회원님을 팔로우했습니다.',
    2: '님이 회원님의 게시물을 좋아합니다.',
    3: '님이 회원님의 게시물에 댓글을 달았습니다.',
    4: '님이 회원님의 댓글을 좋아합니다.',
    5: '님이 회원님의 댓글에 대댓글을 달았습니다.'
  }

  const renderItem = ({item})=>{
    return(
      <TouchableOpacity
				style={{...styles.renderItemContainer, width:screenWidth}}
        onPress={() => {
          navigation.navigate('게시글', {id: item.boardId});
        }}
      >
        <View style={styles.contentContainer}>
          <Image 
              style={styles.image}
              source={ { 
                uri:item.profileImage,
                }}/>
          <View style={styles.textContainer}>
            <Text style={styles.contentFont}>
              <TouchableOpacity 
                onPress={() => {
                navigation.push('서브프로필', {
                initial: false,
                nickname: item.nickname,
            })}} style={styles.justify}><Text style={styles.nicknameFont}>{item.nickname} </Text></TouchableOpacity>{noticeDict[item.type]}</Text>
            <Text style={styles.createdFont}>{item.createdAt}</Text>
          </View>
        </View>
      </TouchableOpacity>)
  }
  return (
    <View style={{height:'100%'}}>
      <CustomSubHeader title="알림" navigation={navigation} />
      <FlatList
        style={{width:'100%', height:'100%',backgroundColor:'white'}}
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item,idx)=>idx+item.boardId+item.nickname+item.createdAt}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default NoticeScreen;
const styles = StyleSheet.create({
	renderItemContainer:{
		paddingHorizontal: 10,
		paddingVertical: 12,
		color:'black'
	},
  image:{
    width:50,
    height:50,
    borderRadius:50
  },
  contentContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:10,
  },
  nicknameFont:{
    color:'#DE4976',
    fontWeight:'700',
  },
  contentFont:{
    color:'#323232',
    marginBottom:3,
    // justifyContent:'center',
    width:'100%'
  },
  createdFont:{
    color:'#525252',
    fontSize:12
  },
  textContainer:{
    marginLeft:15,
    width:320,
    // height:30,
  },
  justify:{
    transform:[{translateY:4}],
  }
})