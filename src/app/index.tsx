import React from 'react';
import { View, StyleSheet, Text, Animated, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

const items = [
  { id: 1, title: "Efeito Parallax", image: require('../../assets/images/1.jpg') },
  { id: 2, title: "React Native", image: require('../../assets/images/2.jpg') },
  { id: 3, title: "Título 1 - Modelo", image: require('../../assets/images/3.jpg') },
  { id: 4, title: "Título 2 - Modelo", image: require('../../assets/images/4.jpg') },
  { id: 5, title: "Título 3 - Modelo", image: require('../../assets/images/5.jpg') },
];

export default function App() {
  const scrollAnimation = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={items}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollAnimation } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Animated.Image
              source={item.image}
              style={[styles.image, {
                transform: [{
                  translateX: scrollAnimation.interpolate({
                    inputRange: [
                      width * (index - 1),
                      width * index,
                      width * (index + 1)
                    ],
                    outputRange: [-width * 0.8, 0, width * 0.8]
                  })
                }]
              }]}
            />
            <Animated.View
              style={[styles.titleContainer, {
                opacity: scrollAnimation.interpolate({
                  inputRange: [
                    width * (index - 1),
                    width * index,
                    width * (index + 1)
                  ],
                  outputRange: [0, 1, 0],
                }),
                transform: [{
                  translateX: scrollAnimation.interpolate({
                    inputRange: [
                      width * (index - 1),
                      width * index,
                      width * (index + 1)
                    ],
                    outputRange: [250, 0, -250],
                  })
                }]
              }]}
            >
              <Text style={styles.title}>{item.title}</Text>
            </Animated.View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width,
    height,
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
    width: width * 0.8, // Para centralizar o título
  },
  title: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
  },
});
