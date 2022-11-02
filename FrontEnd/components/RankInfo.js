import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';

import RankItem from '../assets/info/RankItem';
import {levelColorDict} from '../assets/info/ColorInfo';

import Close from '../assets/image/profile/close.svg';

// rank가 V1 이런 식으로 들어오는 상태
function RankInfo({setIsRank, exp, rank}) {
  const levels = ['빨강', '주황', '노랑', '초록', '파랑', '남색', '보라'];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setIsRank(false);
        }}
        style={styles.close}>
        <Close />
      </TouchableOpacity>
      <Text style={styles.title}>현재 등급</Text>
      <Text style={styles.subTitle}>{rank}</Text>
      <View style={styles.mainIcon}>
        {RankItem[parseInt(rank[1], 10)].main}
      </View>

      <View style={styles.iconBox}>
        <View style={styles.subIcon}>
          {RankItem[parseInt(rank[1], 10) + 1].sub}
        </View>
        <View style={styles.subIcon}>{RankItem[0].sub}</View>
        <View style={styles.subIcon}>{RankItem[0].sub}</View>
      </View>

      <View style={styles.barBox}>
        <View style={styles.barBG}>
          <View
            style={[
              styles.bar,
              {
                width: `${exp}%`,
                backgroundColor: `${RankItem[parseInt(rank[1], 10)].color}`,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.text}>
          다음 등급으로 올라가려면 Y{parseInt(rank[1], 10) + 1} 난도 {}문제를 더
          풀어야합니다
        </Text>
        <Text style={styles.text}>다음 등급까지 {}xp 남았습니다.</Text>
      </View>

      <View style={styles.horizonLine} />

      <Text style={styles.title}>YC 등급표</Text>

      <View style={styles.levelBarBox}>
        <FlatList
          key={levels}
          data={levels}
          numColumns={levels.length}
          renderItem={({item}) => (
            <View
              style={[
                styles.levelbar,
                {
                  backgroundColor: levelColorDict[item],
                  width: `${100 / levels.length - 0.2}%`,
                },
              ]}
            />
          )}
        />
      </View>
      <Text style={styles.description}>
        Young Climb은 자체 등급을 통해 개인 성장을 측정합니다! 풀이 문제의
        난이도에 따라 경험치를 획득할 수 있습니다. 상위 단계로 올라가기 위해서는
        일정치 이상의 경험치가 필요하며, 상위 난도의 문제를 3개 이상
        풀어야합니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    marginVertical: 15,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  mainIcon: {},
  iconBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  subIcon: {
    marginHorizontal: 5,
  },
  barBox: {width: '100%', justifyContent: 'center', alignItems: 'center'},
  barBG: {
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    height: 10,
    marginVertical: 10,
  },
  bar: {
    width: '40%',
    borderRadius: 5,
    height: 10,
  },
  textBox: {},
  text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
  },
  horizonLine: {
    borderColor: 'black',
    borderWidth: 0.2,
    width: '100%',
    height: 0,
    marginTop: 30,
  },
  levelBarBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelbar: {
    height: 25,
    width: '10%',
  },
  description: {
    marginTop: 15,
    width: '80%',
    fontSize: 12,
    color: 'black',
  },
});

export default RankInfo;
