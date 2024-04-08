import {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import useImageStore from '../../store/store';

const GalleryScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const {width: screenWidth} = useWindowDimensions();
  const setAllImages = useImageStore(state => state.setAllImages);
  useEffect(() => {
    fetch('https://api.pexels.com/v1/curated?per_page=25', {
      headers: {
        Authorization: process.env.API_KEY,
      },
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        const posts = json?.photos;
        setAllImages(posts);
        setPosts(posts);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }, []);

  return (
    <ScrollView>
      <View style={[styles.imageContainer, {maxWidth: screenWidth}]}>
        {posts?.map(post => (
          <View style={styles.tileContainer} key={post?.id}>
            <TouchableOpacity
              style={styles.highlight}
              onPress={() => {
                navigation.navigate('Image', {
                  postImage: post,
                });
              }}>
              <Image style={styles.tile} source={{uri: post?.src?.medium}} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    backgroundColor: '#66635B',
    paddingTop: 10,
  },
  tileContainer: {
    width: '19%',
    marginVertical: 10,
  },
  tile: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 15,
  },
  title: {
    fontSize: 16,
    marginTop: 6,
    textAlign: 'center',
    color: 'white',
  },
  highlight: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});
