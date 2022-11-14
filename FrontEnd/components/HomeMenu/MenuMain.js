import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  BackHandler
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'


import Why from '../../assets/image/menu/Why.svg'
import Declare from '../../assets/image/menu/Declare.svg'
import Bookmark from '../../assets/image/menu//Bookmark.svg'
import FeatherPen from '../../assets/image/menu/FeatherPen.svg'


const MenuMain = (props) => {
  const {parentnavigation, navigation, focusedContent, setModalVisible} = props
  
  useFocusEffect(()=>{
    BackHandler.removeEventListener('hardwareBackPress')
    const backAction = ()=>{
      setModalVisible(false)
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress',backAction);
    return() =>{backHandler.remove();}
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.flex}
        onPress={()=>navigation.navigate('게시물정보')}
        >
        <FeatherPen/>
        <Text style={styles.fontBasic}>게시물 정보</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.flex}>
        <Bookmark/>
        <Text style={styles.fontBasic}>게시물 스크랩</Text>
      </TouchableOpacity>
      <TouchableOpacity  
        style={{...styles.flex}}
        onPress={()=>navigation.navigate('표시이유')}
        >
        <Why/>
        <Text style={styles.fontBasic}>게시물이 표시되는 이유</Text>
      </TouchableOpacity>
      <TouchableOpacity  
        style={styles.flex}
        onPress={()=>navigation.navigate('신고')}
        >
        <Declare/>
        <Text style={{...styles.fontBasic, color:'#F34D7F', fontWeight:'700'}}>게시물 신고</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MenuMain

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:20,
    paddingVertical: 10,
    backgroundColor: 'white',
    height:200,
    width:'100%'
  },
  flex:{
    flexDirection:'row',
    alignItems:'center',
    height:45,
  },
  fontBasic :{
    fontSize:17,
    color: 'black',
    fontWeight:'500',
    marginBottom:1,
    marginLeft:10
  }
})