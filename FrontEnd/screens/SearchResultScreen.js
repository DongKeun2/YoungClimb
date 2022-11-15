import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

import CustomSubHeader from '../components/CustomSubHeader';
import LevelLabel from '../components/LevelLabel';
import HoldLabel from '../components/HoldLabel';
import levelColorInfo from '../assets/info/CenterInfo';

function SearchResultScreen({navigation, route}) {
  const center = route.params.center;
  const wallName = route.params.wallName;
  const level = levelColorInfo[route.params.level - 1]?.color;
  const holdColor = route.params.holdColor;
  const boards = useSelector(state => state.search.boards);

  return (
    <>
      <CustomSubHeader title="검색 결과" navigation={navigation} />
      <View style={styles.filterBox}>
        <Text style={styles.text}>
          {center} {wallName}
        </Text>
        {level ? <LevelLabel color={level} /> : null}
        {holdColor ? <HoldLabel color={holdColor} /> : null}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          {boards.length ? (
            <CardList boards={boards} navigation={navigation} />
          ) : (
            <Text style={styles.noSearchText}>검색 결과 없음</Text>
          )}
        </View>
      </ScrollView>
    </>
  );
}

import ArticleCard from '../components/ArticleCard';
function CardList({boards, navigation}) {
  return (
    <>
      <View style={styles.articleContainer}>
        {boards.map((board, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                navigation.navigate('게시글', {id: board.id});
              }}
              style={styles.cardContainer}>
              <ArticleCard
                type="search"
                article={board}
                navigation={navigation}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardContainer: {
    display: 'flex',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  text: {
    color: 'black',
  },
  filterBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    paddingLeft: 30,
    paddingBottom: 10,
  },
  articleContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noSearchText: {color: 'black', padding: 30},
});

export default SearchResultScreen;
