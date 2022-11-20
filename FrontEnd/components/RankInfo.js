/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';

import {levelColorDict} from '../assets/info/ColorInfo';

import Close from '../assets/image/profile/close.svg';
import HoldIcon from '../assets/image/hold/hold.svg';
import {YCLevelColorDict, holdColorDict} from '../assets/info/ColorInfo';

// rank가 V1 이런 식으로 들어오는 상태
function RankInfo({setIsRank, exp, expleft, rank, upto}) {
  const levels = ['빨강', '주황', '노랑', '초록', '파랑', '남색', '보라'];
  const problems = ['V0', 'V1', 'V3', 'V5', 'V6', 'V7', 'V8'];
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
        <HoldIcon width={90} height={90} color={YCLevelColorDict[rank]} />
      </View>

      <UptoInfo rank={rank} upto={upto} />

      <View style={styles.barBox}>
        <View style={styles.barBG}>
          <View
            style={[
              styles.bar,
              {
                width: `${exp}%`,
                backgroundColor: `${YCLevelColorDict[rank]}`,
              },
            ]}
          />
        </View>
      </View>
      {rank === 'Y7' ? (
        <Text style={{...styles.text, fontSize: 12}}>
          이미 최고 등급입니다!
        </Text>
      ) : (
        <View style={styles.textBox}>
          <Text style={styles.text}>다음 등급까지 {expleft}xp 남았습니다.</Text>
          <Text style={styles.text}>
            다음 등급으로 올라가려면 {problems[parseInt(rank[1]) - 1]} 난이도
            이상의 문제를 {3 - upto}개 더 풀어야 합니다.
          </Text>
        </View>
      )}
      <View style={styles.horizonLine} />

      <Text style={styles.title}>YC 등급표</Text>
      <View style={styles.levelBarBox}>
        <View style={{width: '100%', height: 25, flexDirection: 'row'}}>
          {levels.map((item, idx) => {
            return (
              <View
                key={item}
                style={[
                  styles.levelBar,
                  {
                    backgroundColor: levelColorDict[item],
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>
          Young Climb은 자체 등급을 통해 개인 성장을 측정합니다!
        </Text>
        <Text style={styles.description}>
          풀이 문제의 난이도에 따라 경험치를 획득할 수 있습니다.
        </Text>
        <Text style={styles.description}>
          상위 단계로 올라가기 위해서는 일정 수치 이상의 경험치가 필요하며,
        </Text>
        <Text style={styles.description}>
          상위 난도의 문제를 3개 이상 풀어야 합니다.
        </Text>
      </View>
    </View>
  );
}

function UptoInfo({rank, upto}) {
  const count = [1, 2, 3];

  return (
    <View style={styles.iconBox}>
      {count.map(item => {
        if (item <= upto) {
          return (
            <View key={item} style={styles.subIcon}>
              <HoldIcon
                width={30}
                height={30}
                color={YCLevelColorDict[`Y${parseInt(rank[1], 10) + 1}`]}
              />
            </View>
          );
        } else {
          return (
            <View key={item} style={styles.subIcon}>
              <HoldIcon width={30} height={30} color={holdColorDict.회색} />
            </View>
          );
        }
      })}
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
    fontSize: 10,
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
  levelBar: {
    marginHorizontal: '0.1%',
    height: 25,
    width: `${100 / 7 - 0.2}%`,
  },
  descriptionBox: {
    marginTop: 15,
    width: '80%',
  },
  description: {
    fontSize: 12,
    color: 'black',
  },
});

export default RankInfo;
