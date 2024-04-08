import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import useImageStore from '../../store/store';

// import {useCounterStore} from '../../store/store';

export const SecondScreen = () => {
  // const [count, increment, decrement] = useCounterStore(store => [
  //   store.count,
  //   store.increment,
  //   store.decrement,
  // ]);
  const image = useImageStore(store => store.image);
  return (
    <>
      <View style={{flex:1}}>
        <Image source={{uri: image}} style={styles.image} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  wrapper: {
    backgroundColor: 'white',
  },
  title: {},
});
