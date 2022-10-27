import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import BackIcon from '../assets/image/header/backIcon.svg';
import NextIcon from '../assets/image/header/nextIcon.svg';
import CloseIcon from '../assets/image/header/closeIcon.svg';

function CustomSubHeader({
  title, // 상단 헤더 제목 (헤더의 왼쪽에 위치)
  rightTitle, // 상단 헤더 오른쪽에 텍스트가 있을 때에만 작성
  navigation, // 헤더에서 이동 필요할 때 navigation={navigation} 작성해서 상속해주기
  isVideo, // 영상 선택하는 헤더에만 true, 나머지 경우에는 사용할 필요 x
  isProfile, // 프로필 관련 서브 헤더에만 true, 나머지 경우에는 사용할 필요 x
  isPhoto, // 프로필 관련 서브 헤더에서 갤러리 접근하면 true, 나머지 경우에는 사용할 필요 x
  request, // 프로필 관련 서브 헤더에서 요청하는 api 함수 입력
}) {
  return isVideo ? (
    <View style={styles.headerbox}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => (navigation ? navigation.goBack() : null)}>
          <CloseIcon style={{marginLeft: 5, marginRight: 5}} />
        </TouchableOpacity>
        <Text style={{fontSize: 16}}>{title}</Text>
      </View>
      <View style={styles.container}>
        <Text style={{fontSize: 16}}>{rightTitle}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation ? navigation.navigate('정보 입력') : null
          }>
          <NextIcon style={{marginLeft: 5, marginRight: 5}} />
        </TouchableOpacity>
      </View>
    </View>
  ) : isProfile ? (
    <View style={styles.headerbox}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => (navigation ? navigation.goBack() : null)}>
          {isPhoto ? (
            <CloseIcon style={{marginLeft: 5, marginRight: 5}} />
          ) : (
            <BackIcon style={{marginLeft: 5, marginRight: 5}} />
          )}
        </TouchableOpacity>
        <Text style={{fontSize: 16}}>{title}</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => (request ? request : null)}>
          <Text style={{fontSize: 16, color: '#F34D7F', marginRight: 5}}>{rightTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => (navigation ? navigation.goBack() : null)}>
        <BackIcon style={{marginLeft: 5, marginRight: 5}} />
      </TouchableOpacity>
      <Text style={{fontSize: 16}}>{title}</Text>
    </View>
  );
}

CustomSubHeader.defaultProps = {
  title: 'untitled',
  navigation: null,
  isVideo: false,
  isProfile: false,
  isPhoto: false,
  request: () => null,
};

const styles = StyleSheet.create({
  headerbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: 'white',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: 'white',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSubHeader;
