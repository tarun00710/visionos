import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video, {VideoRef} from 'react-native-video';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS, useSharedValue} from 'react-native-reanimated';
const VideoPlayScreen = ({route, navigation}: any) => {
  const {video} = route.params;
  const videourl = video.sources[0];
  const videoRef = useRef<VideoRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setShowButton(false);
      } else {
        videoRef.current.resume();
      }
      setIsPlaying(!isPlaying);
      setShowButton(false);
    }
  };

  const onVideoClickHandler = () => {
    setShowButton(true);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowButton(true);
  };
  const toggleBackBtn = () => {
    videoRef.current?.seek(currentTime - 10);
  };
  const toggleForwardBtn = () => {
    videoRef.current?.seek(currentTime + 10);
  };

  const onProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      console.log('Single tap!');
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(navigation.goBack)();
    });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => onVideoClickHandler()}
            style={[styles.videoplayContainer]}>
            <Video
              ref={videoRef}
              source={{uri: videourl}}
              style={styles.backgroundVideo}
              paused={!isPlaying}
              onEnd={handleVideoEnd}
              onProgress={onProgress}
            />
            {showButton && (
              <View style={[styles.btnContainer]}>
                <TouchableOpacity
                  style={styles.btnStyle}
                  onPress={toggleBackBtn}>
                  <MaterialIcons name="replay-10" size={100} color={'#fff'} />
                </TouchableOpacity>
                {!isPlaying ? (
                  <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={togglePlayPause}>
                    <MaterialIcons
                      name="play-arrow"
                      size={100}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={togglePlayPause}>
                    <MaterialIcons name="pause" size={100} color={'#fff'} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.btnStyle}
                  onPress={toggleForwardBtn}>
                  <MaterialIcons name="forward-10" size={100} color={'#fff'} />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default VideoPlayScreen;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: 'rgba(0,0,0,.1)',
    marginHorizontal: 50,
    borderRadius: 25,
  },
  btnContainer: {
    position: 'absolute',
    top: '45%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  videoplayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
  },
});
