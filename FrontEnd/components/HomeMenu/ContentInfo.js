import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import ProfileSVG from '../../assets/image/menu/profile.svg'
import Post from '../../assets/image/menu/Post.svg'
import Statistics from '../../assets/image/menu/Statistics.svg'
import HoldIcon from '../../assets/image/hold/hold.svg'

const ContentInfo = ({navigation, focusedContent}) => {
  console.log(focusedContent, 'info')
  return (
    <View style={{paddingHorizontal:20, paddingVertical:15}}>
      {/* 작성자 - 이름, rank */}
      <View style={styles.flex}>
        <ProfileSVG/>
        <Text style={styles.subTitle}>Creator</Text>
      </View>
      
      <View style={styles.padding10}>
        <Text style={{...styles.baseFont, marginBottom:7}}>{focusedContent.createUser.nickname}  ( Rank: {focusedContent.createUser.rank} )</Text>
      </View>
      {/* 문제정보 */}
      <View style={styles.flex}>
        <HoldIcon
          width={16}
          height={18}
          color={'rgba(0,0,0,0.1)'}
        />
        <Text style={styles.subTitle}>Problem</Text>
      </View>
      <View style={styles.padding10}>
        <Text style={styles.baseFont}>풀이 일자: {focusedContent.solvedDate}</Text>
        <Text style={styles.baseFont}>클라이밍장: {focusedContent.centerName}</Text>
        <Text style={{...styles.baseFont, marginBottom:7}}>난이도: {focusedContent.centerLevelColor}({focusedContent.difficulty})</Text>
      </View>

      {/* 작성일 */}
      <View style={styles.flex}>
        <Post           
          width={15}
          height={15}
          style={{marginLeft:1}}/>
        <Text style={styles.subTitle}>Post</Text>
      </View>
      <View style={styles.padding10}>
        <Text style={{...styles.baseFont, marginBottom:7}}>게시물 작성일: {focusedContent.createdAt}</Text>
      </View>
      {/* Statistics 좋아요 수 , 조회 수, 댓글 수 */}
      <View style={styles.flex}>
        <Statistics           
          width={15}
          height={15}
          style={{marginLeft:1}}/>
        <Text style={styles.subTitle}>Statistics</Text>
      </View>
      <View style={styles.padding10}>
        <Text style={styles.baseFont}>좋아요: {focusedContent.like} 개</Text>
        <Text style={styles.baseFont}>조회수: {focusedContent.view} 회</Text>
        <Text style={styles.baseFont}>댓글: {focusedContent.commentNum} 개</Text>
      </View>
    </View>
  )
}

export default ContentInfo

const styles = StyleSheet.create({
  flex:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical:4,
  },
  title:{
    color:'#525252',
    fontSize:16,
    fontWeight: '500',
    marginBottom: 10
  },
  subTitle:{
    color:'#525252',
    fontSize:15,
    fontWeight: '400',
    marginLeft:5,
    marginBottom:1
  },
  baseFont:{
    color:'#525252',
    fontSize:14,
    marginVertical:1
  },
  padding10:{
    paddingHorizontal:20
  }
})