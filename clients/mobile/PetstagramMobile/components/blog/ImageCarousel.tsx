import React from "react";
import { FlatList, Image, StyleSheet } from "react-native";

const ImageCarousel = ({ images }) => {
  return (
    <FlatList
      data={images}
      horizontal
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={styles.image} />
      )}
      contentContainerStyle={styles.carousel}
    />
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  carousel: {
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 150,
    marginRight: 10,
    borderRadius: 8,
  },
});
