import React, {useState} from 'react';
import {
  Alert,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {XR} from '@callstack/react-native-visionos';

const HomeScreen = ({navigation}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const openImmersiveSpace = async () => {
    try {
      await XR.requestSession('SnowEmitter');
      setIsOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  const closeImmersiveSpace = async () => {
    await XR.endSession();
    setIsOpen(false);
  };
  return (
    <View style={styles.folderContainer}>
      <TouchableOpacity
        style={styles.folder}
        onPress={() => navigation.navigate('Gallery')}>
        <MaterialIcons name="folder" size={180} color={'#87CEEB'} />
        <Text style={styles.textStyle}>Photos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.folder}
        onPress={() => navigation.navigate('Video')}>
        <MaterialIcons name="folder" size={180} color={'#87CEEB'} />
        <Text style={styles.textStyle}>Videos</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#7a7a7a' : '#000',
              marginBottom: 12,
            },
            styles.button,
          ]}
          onPress={openImmersiveSpace}>
          <Text style={styles.buttonText}>Open ImmersiveSpace</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#7a7a7a' : '#000',
            },
            styles.button,
          ]}
          onPress={closeImmersiveSpace}>
          <Text style={styles.buttonText}>Close ImmersiveSpace</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  folderContainer: {
    margin: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backfaceVisibility:'hidden',
    backgroundColor:'transparent'
  },
  textStyle: {
    fontSize: 19,
  },
  folder: {
    alignItems: 'center',
    width: 250,
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '20%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    letterSpacing: 1,
  },
  button: {
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
