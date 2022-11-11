import React, {useState, useRef} from 'react';
import {Dimensions, StatusBar, View, FlatList, StyleSheet} from 'react-native';
import ReelsItem from './ReelsItem';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

function ReelsList({reels, navigation}) {
  const viewHeight =
    Dimensions.get('screen').height - Dimensions.get('window').height > 60
      ? Dimensions.get('window').height
      : Dimensions.get('window').height - StatusBar.currentHeight;
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [visablePostIndex, setVisablePostIndex] = useState(0);

  const onViewRef = useRef(({viewableItems}) => {
    if (viewableItems && viewableItems[0]) {
      const index = viewableItems[0].index;
      if (typeof index === 'number') {
        setVisablePostIndex(index);
      }
    } else {
      setVisablePostIndex(-1);
    }
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  return (
    <View style={styles.container}>
      <FlatList
        data={reels}
        decelerationRate="fast"
        disableIntervalMomentum
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => (
          <ReelsItem
            item={item}
            navigation={navigation}
            isViewable={index === visablePostIndex}
            viewHeight={viewHeight}
          />
        )}
        snapToInterval={viewHeight - bottomTabBarHeight}
        snapToAlignment="start"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReelsList;
