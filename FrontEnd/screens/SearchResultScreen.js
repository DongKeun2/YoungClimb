import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

import CustomSubHeader from '../components/CustomSubHeader';
import LevelLabel from '../components/LevelLabel';
import HoldLabel from '../components/HoldLabel';

function SearchResultScreen({navigation, route}) {
  const center = route.params.center;
  const wall = route.params.wall;
  const level = route.params.level;
  const holdColor = route.params.holdColor;
  const boards = useSelector(state => state.search.boards);

  return (
    <>
      <CustomSubHeader title="검색 결과" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.filterBox}>
          <Text style={styles.text}>
            {center} {wall}
          </Text>
          {level ? <LevelLabel color={level} /> : null}
          {holdColor ? <HoldLabel color={holdColor} /> : null}
        </View>

        <View>
          <CardList articles={boards} navigation={navigation} />
        </View>
      </ScrollView>
    </>
  );
}

import ArticleCard from '../components/ArticleCard';
function CardList({articles, navigation}) {
  return (
    <>
      <View style={styles.articleContainer}>
        {articles.map((article, i) => {
          return (
            <ArticleCard key={i} article={article} navigation={navigation} />
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  filterBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  articleContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default SearchResultScreen;
