import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import HoldLabel from './HoldLabel';
import LevelLabel from './LevelLabel';
import Video from 'react-native-video';
import UserAvatar from './UserAvatar';

import HoldIcon from '../assets/image/hold/hold.svg';
import {YCLevelColorDict} from '../assets/info/ColorInfo';

function ArticleCard({article, type}) {
  return (
    <View style={styles.cardBox}>
      {type === 'search' ? (
        <View style={styles.createUserInfo}>
          <UserAvatar source={{uri: article.createUser.image}} size={20} />
          <Text style={styles.name}>{article.createUser.nickname}</Text>
          <HoldIcon
            width={15}
            height={15}
            color={YCLevelColorDict[article.createUser.rank]}
          />
        </View>
      ) : null}
      <View style={styles.videoBox}>
        <Video
          source={{uri: article.mediaPath}}
          style={styles.video}
          fullscreen={false}
          resizeMode="cover"
          repeat={false}
          controls={false}
          paused={true}
          muted={true}
        />
      </View>
      <View style={styles.InfoBox}>
        <View style={styles.cardInfo}>
          <Text style={styles.text}>
            {article.centerName} {article.wallName}
          </Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.text}>[{article.difficulty}]</Text>
          <LevelLabel color={article.centerLevelColor} />
          <HoldLabel color={article.holdColor} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBox: {
    width: '100%',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
  },
  videoBox: {
    width: '98%',
    height: 180,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
  name: {
    color: 'black',
    marginLeft: 5,
  },
  createUserInfo: {
    padding: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ArticleCard;
