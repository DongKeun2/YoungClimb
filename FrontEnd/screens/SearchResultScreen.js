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
  const wall = route.params.wall;
  const level = levelColorInfo[route.params.level - 1]?.color;
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
          {boards.length ? (
            <CardList boards={boards} navigation={navigation} />
          ) : (
            <Text style={styles.text}>검색 결과 없음</Text>
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
          console.log(board);
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                navigation.navigate('게시글');
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
    marginBottom: 20,
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
