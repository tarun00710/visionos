import {WindowManager} from '@callstack/react-native-visionos';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  Directions,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import useImageStore from '../../store/store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const secondWindow = WindowManager.getWindow('SecondScreen');

const ImageScreen = ({route}) => {
  const rotate = useSharedValue(0);
  const setImage = useImageStore(state => state.setImage);
  const AllImages = useImageStore(state => state.allImages);
  const [currentImage, setCurrentImage] = useState();
  const scale = useSharedValue(0);
  const scaleUp = useSharedValue(0);
  useEffect(() => {
    setCurrentImage(route.params.postImage);
  }, []);

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}, {rotateY: `${rotate.value}deg`}],
    };
  });
  const carouselStyle = useAnimatedStyle(() => {
    return {
      transform: [{scaleY: scaleUp.value}],
    };
  });
  useEffect(() => {
    scale.value = 0;
    scale.value = withSpring(1, {damping: 10, stiffness: 100});
  }, [currentImage?.id]);

  const onPressIncrease = () => {
    scale.value = withSpring(scale.value * 1.2);
  };

  const onPressDecrease = () => {
    scale.value = withSpring(scale.value / 1.2);
  };
  const onPressRotate = () => {
    rotate.value = withDelay(
      200,
      withTiming(rotate.value + 180, {duration: 400, easing: Easing.ease}),
    );
  };

  const openSecondSreen = () => {
    setImage(currentImage?.src?.landscape);
    secondWindow.open();
  };
  const closeSecondSreen = () => {
    secondWindow.close();
  };

  const renderCrousel = ({item}) => {
    const flingGesture = Gesture.Fling()
      .direction(Directions.UP)
      .onStart(e => {
        // scaleUp.value = withSpring(scaleUp.value * 1.2);
        console.log('fling');
        runOnJS(setCurrentImage)(item);
      });

    return (
      <TouchableOpacity
        onPress={() => setCurrentImage(item)}
        style={[
          styles.imageItem,
          item.id === currentImage?.id
            ? {borderWidth: 2, borderColor: 'white', padding: 1, width: 150}
            : {},
        ]}>
        <GestureDetector gesture={flingGesture}>
          <Animated.Image source={{uri: item.src.small}} style={[styles.imageCrousel]} />
        </GestureDetector>
      </TouchableOpacity>
    );
  };
  const getCurrentImageIndex = () => {
    const index = AllImages.findIndex(post => post.id === currentImage?.id);
    return index !== -1 ? index : 0;
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.imageContainer}>
        <Animated.Image
          style={[styles.image, imageStyle]}
          source={{uri: currentImage?.src?.landscape}}
        />
        <View style={styles.bottomContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.circleButton]}
              onPress={onPressIncrease}>
              <MaterialIcons name="add" size={34} color={'#363737'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={onPressDecrease}>
              <MaterialIcons name="remove" size={34} color={'#363737'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={onPressRotate}>
              <MaterialIcons
                name="screen-rotation"
                size={34}
                color={'#363737'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={openSecondSreen}>
              <MaterialIcons name="open-in-new" size={34} color={'#363737'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={closeSecondSreen}>
              <MaterialIcons
                name="cancel-presentation"
                size={34}
                color={'#363737'}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.crousel}
            showsHorizontalScrollIndicator={false}
            data={AllImages}
            renderItem={renderCrousel}
            horizontal
            initialScrollIndex={getCurrentImageIndex() || 0}
            getItemLayout={(data, index) => ({
              length: 80,
              offset: 80 * index,
              index,
            })}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  bottomContainer: {
    display: 'flex',
    position: 'absolute',
    zIndex: 999,
    bottom: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButton: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 14,
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 34,
  },
  crousel: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
  },
  imageItem: {
    width: 105,
    height: 105,
  },
  imageCrousel: {
    flex: 1,
    width: '100%',
  },
});
