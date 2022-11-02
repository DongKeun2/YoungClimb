import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

function UserAvatar({source, rank, size}) {
  return (
    <View style={[styles.imgBox, {width: size, height: size}]}>
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
});
export default UserAvatar;
