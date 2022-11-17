import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import CustomSubHeader from '../../components/CustomSubHeader';

import ExpandDown from '../../assets/image/map/ExpandDown.svg';
import ExpandUp from '../../assets/image/map/ExpandUp.svg';

function AppInfo({navigation}) {
  const [isVersion, setIsVersion] = useState(false);
  const [isTerms, setIsTerms] = useState(false);
  const [isSens, setIsSens] = useState(false);

  return (
    <>
      <CustomSubHeader title={'앱 정보'} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.infoFlex}>
              <TouchableOpacity
                style={styles.titleBox}
                onPress={() => {
                  setIsVersion(!isVersion);
                }}>
                {isVersion ? (
                  <ExpandUp style={{marginRight: 6}} />
                ) : (
                  <ExpandDown style={{marginRight: 6}} />
                )}
                <Text style={styles.title}>앱 버전 정보</Text>
              </TouchableOpacity>
              {isVersion ? (
                <View style={styles.detailBox}>
                  <Text style={styles.text}>2022.11.16 v1.0.3</Text>
                  <Text style={styles.text}>2022.11.15 release v1.0.0</Text>
                </View>
              ) : null}
            </View>

            <View style={styles.infoFlex}>
              <TouchableOpacity
                style={styles.titleBox}
                onPress={() => {
                  setIsTerms(!isTerms);
                }}>
                {isTerms ? (
                  <ExpandUp style={{marginRight: 6}} />
                ) : (
                  <ExpandDown style={{marginRight: 6}} />
                )}
                <Text style={styles.title}>이용 약관</Text>
              </TouchableOpacity>
              {isTerms ? (
                <View style={styles.detailBox}>
                  <Text style={styles.text}>
                    {'<'} Young Climb {'>'}은(는) 「개인정보 보호법」 제30조에
                    따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을
                    신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
                    개인정보 처리방침을 수립·공개합니다.
                  </Text>
                  <Text style={styles.text}>
                    ○ 이 개인정보처리방침은 2022년 11월 14부터 적용됩니다.
                  </Text>
                  <Text />
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('이용약관');
                    }}>
                    <Text style={styles.link}>더 보기</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>

            <View style={styles.infoFlex}>
              <TouchableOpacity
                style={styles.titleBox}
                onPress={() => {
                  setIsSens(!isSens);
                }}>
                {isSens ? (
                  <ExpandUp style={{marginRight: 6}} />
                ) : (
                  <ExpandDown style={{marginRight: 6}} />
                )}
                <Text style={styles.title}>민감정보 취급 약관</Text>
              </TouchableOpacity>
              <View style={{width: 27, alignItems: 'center'}} />
              {isSens ? (
                <View style={styles.detailBox}>
                  <Text style={styles.subTitle}>민감정보 수집 및 이용약관</Text>
                  <Text style={styles.text}>
                    {'<'} Young Climb {'>'}에서는 비슷한 클라이머 정보의
                    게시물을 추천, 제공하기 위하여 다음과 같은 민감정보를 수집
                    및 이용하고 있습니다.
                  </Text>
                  <Text style={styles.text}>민감정보</Text>
                  <Text style={styles.text}>
                    민감정보 수집 목적 : 개인정보 활용을 통한 회원 군집화 및
                    정보 맞춤 추천
                  </Text>
                  <Text style={styles.text}>
                    민감정보 항목* : 위치정보, 신장, 팔 길이, 신발 사이즈
                  </Text>
                  <Text style={styles.text}>
                    민감정보 보유기간 : 회원탈퇴 시까지 동의거부 권리
                  </Text>
                  <Text style={styles.text}>
                    귀하께서는{'<'} Young Climb {'>'}의 민감정보 수집 및 이용에
                    대한 동의 거부권이 있으며 동의 거부 시에는 맞춤 정보 추천 등
                    Young Climb의 일부 서비스를 이용할 수 없습니다.
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingBottom: 50,
    padding: 20,
  },
  subContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    width: '80%',
  },
  nameFont: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  infoFlex: {
    marginBottom: 7,
  },
  detailBox: {
    marginLeft: 10,
  },
  text: {
    color: '#323232',
  },
  link: {
    alignSelf: 'flex-end',
    color: '#C4C4C4C4',
  },
});

export default AppInfo;
