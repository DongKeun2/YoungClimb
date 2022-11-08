import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const DeclareMenu = ({navigation, focusedContent}) => {
  const [selected, setSelected] = useState(0)
  const [declareList, setDeclareList] = useState([
    { id: 1,
      text:'스팸',
      selected: false
    },
    { id: 2,
      text:'혐오 발언 및 상징',
      selected: false
    },
    { id: 3,
      text:'상품 판매 등 상업 활동',
      selected: false
    },
    { id: 4,
      text:'실제 문제 난이도와 게시물 상 난이도가 다릅니다',
      selected: false
    },
    { id: 5,
      text:'풀이를 완료하지 못한 문제를 완료로 표기했습니다',
      selected: false
    },
    ])
  
  useEffect(()=>{
    setDeclareList(
      declareList.map((option)=>{
        if (option.id === selected) {
          option.selected = true
        } else{
          option.selected = false
        }
        return option
      })
    )
  },[selected])
  
    const handleChoice = (id) => {
      if (id === selected) {
        setSelected(0)
      } else {
        setSelected(id)
      }
  }


  const onSubmit = () => {
    // axios 요청
  }
  
  return (
    <View style={styles.container}>
      <Text style={{marginBottom:10}}>이 게시물을 신고하는 이유를 선택해주세요</Text>
      {declareList.map((option, idx)=>{
        return(
          <TouchableOpacity
            onPress={()=>{handleChoice(option.id)}} 
            key={idx}
            style={{...styles.option, backgroundColor: option.selected ? 'rgba(243,77,127,0.3)':'rgba(0,0,0,0)'}}>
            <Text style={{color:'#525252', fontWeight:option.selected ?'600':'400', marginLeft:2}}>{option.text}</Text>
          </TouchableOpacity>
        )
      })}
      <TouchableOpacity 
        onPress={onSubmit}
        style={styles.submitBtn}>
        <Text style={{ color:'white', fontWeight:'700', fontSize:16}}>완료</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DeclareMenu

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:20,
    paddingVertical: 10,
    backgroundColor: 'white',
    height:320,
    width:'100%'},
  option: {
    width:'100%',
    height:35,
    padding:5,
    justifyContent:'center',
    marginVertical:2.5
  },
  submitBtn:{
    height:40,
    width:'100%',
    backgroundColor:'#F34D7F',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    marginTop:17
  }

})