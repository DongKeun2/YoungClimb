import React from 'react'
import { 
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import Time from '../../assets/image/menu/Time.svg'

const ReasonShown = ({navigation, focusedContent}) => {
  console.log(focusedContent, 'reason')
  return (
    <>
    {focusedContent.isRecommend ? 
      <></>:
      <View style={{paddingHorizontal:20, paddingVertical:10, height:350, backgroundColor:'white'}}>
        <Text style={styles.headerFont}>Young Climb 커뮤니티 활동(유저 팔로우 등)을 기반으로 {'\n'} 피드에 게시물이 표시됩니다.</Text>      
        <View style={styles.flexBox}>
          <Image style={{width:40, height:40, borderRadius:50}} source={{uri:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ocean-quotes-index-1624414741.jpg?crop=1.00xw:0.752xh;0,0.224xh&resize=980:*'}}/>
          <Text style={styles.mainFont}>{focusedContent.createUser.nickname} 님을 팔로우합니다.</Text>
        </View>
        <View style={styles.flexBox}>
          <View style={{borderColor:'#F34D7F', borderWidth:2, width:40, height:40, borderRadius:50, alignItems:'center', justifyContent:'center'}}><Time/></View>
          <Text style={styles.mainFont}>회원님이 조회한 다른 게시물보다 {'\n'}최근 게시물입니다.</Text>
        </View>
      </View>
    
    }
    </>
  )
}

export default ReasonShown

const styles = StyleSheet.create({
  headerFont:{
    textAlign:'center',
    fontSize:13,
    marginBottom: 10    
  },
  flexBox :{
    flexDirection:'row',
    height:70,
    alignItems:'center',
    paddingHorizontal:20 ,

  },
  mainFont:{
    fontSize:14,
    fontWeight:'600',
    marginLeft: 20
  }
})