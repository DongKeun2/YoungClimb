import React from 'react';
import {View, StyleSheet} from 'react-native';

function SearchUserLoading() {
  return (
    <View style={styles.articleContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.cardBox}>
          <View style={styles.avatar} />
          <View style={styles.userInfoBox}>
            <View />
          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cardBox}>
          <View style={styles.avatar} />
          <View style={styles.userInfoBox}>
            <View />
          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cardBox}>
          <View style={styles.avatar} />
          <View style={styles.userInfoBox}>
            <View />
          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cardBox}>
          <View style={styles.avatar} />
          <View style={styles.userInfoBox}>
            <View />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  articleContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    display: 'flex',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  cardBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F4F4F4F4',
  },
  userInfoBox: {
    width: 60,
    height: 15,
    margin: 4,
    backgroundColor: '#F4F4F4F4',
  },
});

export default SearchUserLoading;
