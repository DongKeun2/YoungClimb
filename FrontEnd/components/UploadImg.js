import React, {useState} from 'react';
import {Pressable, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

function ImageUploadSample() {
  const [response, setResponse] = useState(null);
  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        // includeBase64: Platform.OS === 'android',
      },
      res => {
        console.log(res);
        if (res.didCancel) {
          return;
        }
        setResponse(res);
      },
    );
  };

  return (
    <>
      {response ? (
        <TouchableOpacity onPress={onSelectImage}>
          <Image
            style={styles.circle}
            source={{uri: response?.assets[0]?.uri}}
          />
        </TouchableOpacity>
      ) : (
        <Pressable style={styles.circle} onPress={onSelectImage} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    backgroundColor: 'gray',
  },
});

export default ImageUploadSample;
