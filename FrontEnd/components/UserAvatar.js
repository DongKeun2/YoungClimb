import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import rankIcon from '../assets/image/profile/holdIcon.png';

function UserAvatar({source, rank, size}) {
  return (
    <View style={styles.imgBox}>
      {rank && (
        <Image
          source={rankIcon}
          style={[
            styles.rank,
            {
              width: size / 2,
              height: size / 2,
              top: -size / 20,
              left: -size / 20,
            },
          ]}
        />
      )}
      <Image
        style={[
          styles.image,
          {width: size, height: size, borderRadius: size / 2},
        ]}
        source={source}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imgBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {},
  rank: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: 1,
  },
});
export default UserAvatar;
