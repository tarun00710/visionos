import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {videoCollection} from '../DB/VideoDB';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const VideoScreen = ({navigation}) => {
  return (
    <View style={styles.videoContainer}>
      {videoCollection.videos.map((video, index) => (
        <TouchableOpacity
          key={index}
          style={styles.videoView}
          onPress={() => navigation.navigate('VideoPlay', {video: video})}>
          <Image source={{uri: video.thumb}} style={styles.thumbnail} />
          <Text>{video.title}</Text>
          <View style={styles.playBtnContainer}>
            <MaterialIcons name="play-arrow" size={60} color={'#fff'} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  backgroundVideo: {
    flex: 1,
  },
  videoView: {
    width: 230,
    height: 230,
    marginHorizontal: 14,
    marginVertical: 20,
    alignItems: 'center',
    borderRadius: 8,
    position: 'relative',
  },
  playBtnContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    zIndex: 1,
  },
  videoContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  thumbnail: {
    margin: 10,
    borderRadius: 6,
    objectFit: 'cover',
    width: '100%',
    aspectRatio: 1,
  },
});
