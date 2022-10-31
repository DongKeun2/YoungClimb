import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import HoldLabel from './HoldLabel';
import LevelLabel from './LevelLabel';

function ArticleCard({article, navigation, type}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('게시글');
      }}
      style={styles.cardContainer}>
      <View style={styles.cardBox}>
        <Image source={article.mediaId} style={styles.image} />
        <View style={styles.InfoBox}>
          <View style={styles.cardInfo}>
            <Text style={styles.text}>{article.centerName}</Text>
            <Text style={styles.text}>{article.wallName}</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.text}>[{article.difficulty}]</Text>
            <LevelLabel color={article.centerLevelColor} />
            <HoldLabel color={article.holdColor} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  cardBox: {
    width: '100%',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
  InfoBox: {alignItems: 'flex-start', justifyContent: 'center', padding: 1},
  cardInfo: {
    display: 'flex',
    flexDirection: 'row',
    padding: 1,
  },
  text: {
    color: 'black',
  },
});

export default ArticleCard;
