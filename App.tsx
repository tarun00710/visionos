import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Homescreen';
import ImageScreen from './src/screens/ImageScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import VideoScreen from './src/screens/VideoScreen';
import VideoPlayScreen from './src/screens/VideoPlayScreen';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
      // screenOptions={{
      //   direction: I18nManager.isRTL ? 'rtl' : 'ltr',
      // }}
      >
        <Stack.Screen
          name="Storage"
          options={{title: 'Home'}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Gallery"
          options={{title: 'Gallery'}}
          component={GalleryScreen}
        />
        <Stack.Screen
          name="Video"
          options={{title: 'Video'}}
          component={VideoScreen}
        />
         <Stack.Screen
          name="VideoPlay"
          options={{title: 'VideoPlay'}}
          component={VideoPlayScreen}
        />
        <Stack.Screen
          name="Image"
          options={{title: 'ImageView'}}
          component={ImageScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

// const styles = StyleSheet.create({
//   row: {
//     backgroundColor: 'white',
//   },
//   title: {
//     color: 'red',
//   },
//   wrapper: {
//     backgroundColor: 'white',
//   },
// });
