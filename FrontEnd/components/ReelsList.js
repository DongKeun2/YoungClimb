import React, {useState, useRef} from 'react';
import {Dimensions, View, FlatList, StyleSheet} from 'react-native';
import ReelsItem from './ReelsItem';

function ReelsList({reels, navigation}) {
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
          />
        )}
        snapToInterval={Dimensions.get('window').height - 50}
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
