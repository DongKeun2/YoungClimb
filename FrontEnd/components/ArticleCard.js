import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import HoldLabel from './HoldLabel';
import LevelLabel from './LevelLabel';

function ArticleCard({article, navigation}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('게시글');
      }}
      style={styles.cardContainer}>
      <Image source={article.mediaId} />
      <View style={styles.InfoBox}>
        <View style={styles.cardInfo}>
          <Text>{article.centerName}</Text>
          <Text>{article.wallName}</Text>
        </View>
        <View style={styles.cardInfo}>
          <LevelLabel color={article.centerLevelColor} />
          <HoldLabel color={article.holdColor} />
        </View>
      </View>
    </TouchableOpacity>
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
