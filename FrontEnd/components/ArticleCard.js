import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import HoldLabel from './HoldLabel';
import LevelLabel from './LevelLabel';

function ArticleCard({article}) {
  return (
    <View style={styles.cardContainer}>
      <Image source={article.mediaId} />
      <View style={styles.InfoBox}>
        <View style={styles.Info}>
          <Text>위치 정보</Text>
        </View>
        <View style={styles.cardInfo}>
          <LevelLabel name="파랑Lv" color="blue" />
          <HoldLabel name="빨강 홀드" color="red" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {padding: 10},
  InfoBox: {alignItems: 'flex-start', justifyContent: 'center', padding: 1},
  cardInfo: {
    display: 'flex',
    flexDirection: 'row',
    padding: 1,
  },
});

export default ArticleCard;
