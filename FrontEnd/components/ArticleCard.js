import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function ArticleCard({article}) {
  return (
    <View style={styles.cardBox}>
      <Image source={article.mediaId} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardBox: {padding: 10},
});

export default ArticleCard;
